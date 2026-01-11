import { App, Setting, PluginSettingTab, TFolder, Notice } from "obsidian";
import ConfluencePlugin, { FolderMapping } from "./main";

interface PageTitleCache {
	[pageId: string]: {
		title: string;
		fetchedAt: number;
	};
}

export class ConfluenceSettingTab extends PluginSettingTab {
	plugin: ConfluencePlugin;
	private pageTitleCache: PageTitleCache = {};
	private readonly CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

	constructor(app: App, plugin: ConfluencePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	/**
	 * Get all folders in the vault recursively
	 */
	private getAllFolders(): string[] {
		const folders: string[] = [];

		const collectFolders = (folder: TFolder, depth = 0) => {
			// Add current folder (skip root)
			if (folder.path !== "/") {
				folders.push(folder.path);
			}

			// Recursively collect child folders
			for (const child of folder.children) {
				if (child instanceof TFolder) {
					collectFolders(child, depth + 1);
				}
			}
		};

		collectFolders(this.app.vault.getRoot());
		return folders.sort();
	}

	/**
	 * Format folder path for display with indentation showing hierarchy
	 */
	private formatFolderDisplay(folderPath: string): string {
		const depth = folderPath.split("/").length - 1;
		const indent = "  ".repeat(depth);
		const folderName = folderPath.split("/").pop() || folderPath;
		return `${indent}${folderName}`;
	}

	/**
	 * Fetch page title from Confluence API
	 */
	private async fetchPageTitle(pageId: string): Promise<string | null> {
		// Check cache first
		const cached = this.pageTitleCache[pageId];
		if (cached && Date.now() - cached.fetchedAt < this.CACHE_TTL_MS) {
			return cached.title;
		}

		// Validate credentials exist
		if (
			!this.plugin.settings.confluenceBaseUrl ||
			!this.plugin.settings.atlassianUserName ||
			!this.plugin.settings.atlassianApiToken
		) {
			return null;
		}

		try {
			const response = await fetch(
				`${this.plugin.settings.confluenceBaseUrl}/wiki/api/v2/pages/${pageId}`,
				{
					headers: {
						Authorization: `Basic ${btoa(
							`${this.plugin.settings.atlassianUserName}:${this.plugin.settings.atlassianApiToken}`,
						)}`,
						Accept: "application/json",
					},
				},
			);

			if (!response.ok) {
				return null;
			}

			const data = await response.json();
			const title = data.title || null;

			// Cache the result
			if (title) {
				this.pageTitleCache[pageId] = {
					title,
					fetchedAt: Date.now(),
				};
			}

			return title;
		} catch {
			return null;
		}
	}

	/**
	 * Validate a Confluence page ID
	 */
	private async validatePageId(pageId: string): Promise<{
		valid: boolean;
		title?: string;
		error?: string;
	}> {
		if (!pageId || pageId.trim() === "") {
			return { valid: false, error: "Page ID is empty" };
		}

		// Check if it looks like a valid ID (numeric)
		if (!/^\d+$/.test(pageId.trim())) {
			return { valid: false, error: "Page ID should be numeric" };
		}

		const title = await this.fetchPageTitle(pageId.trim());
		if (title) {
			return { valid: true, title };
		}

		return { valid: false, error: "Page not found or inaccessible" };
	}

	/**
	 * Export mappings to JSON
	 */
	private exportMappings(): string {
		const exportData = {
			version: 1,
			defaultParentId:
				this.plugin.settings.defaultConfluenceParentId || null,
			mappings: this.plugin.settings.folderMappings || [],
		};
		return JSON.stringify(exportData, null, 2);
	}

	/**
	 * Import mappings from JSON
	 */
	private async importMappings(jsonString: string): Promise<void> {
		try {
			const data = JSON.parse(jsonString);

			if (!data.version || data.version !== 1) {
				throw new Error("Invalid or unsupported export format");
			}

			if (data.defaultParentId) {
				this.plugin.settings.defaultConfluenceParentId =
					data.defaultParentId;
			}

			if (Array.isArray(data.mappings)) {
				// Validate mappings structure
				const validMappings = data.mappings.filter(
					(m: FolderMapping) =>
						m &&
						typeof m.localFolder === "string" &&
						typeof m.confluenceParentId === "string",
				);
				this.plugin.settings.folderMappings = validMappings;
			}

			await this.plugin.saveSettings();
			new Notice(`Imported ${data.mappings?.length || 0} mappings`);
			this.display(); // Refresh UI
		} catch (error) {
			new Notice(
				`Import failed: ${
					error instanceof Error ? error.message : "Invalid JSON"
				}`,
			);
		}
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl("h2", {
			text: "Settings for connecting to Atlassian Confluence",
		});

		new Setting(containerEl)
			.setName("Confluence Domain")
			.setDesc('Confluence Domain eg "https://mysite.atlassian.net"')
			.addText((text) =>
				text
					.setPlaceholder("https://mysite.atlassian.net")
					.setValue(this.plugin.settings.confluenceBaseUrl)
					.onChange(async (value) => {
						this.plugin.settings.confluenceBaseUrl = value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(containerEl)
			.setName("Atlassian Username")
			.setDesc('eg "username@domain.com"')
			.addText((text) =>
				text
					.setPlaceholder("username@domain.com")
					.setValue(this.plugin.settings.atlassianUserName)
					.onChange(async (value) => {
						this.plugin.settings.atlassianUserName = value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(containerEl)
			.setName("Atlassian API Token")
			.setDesc("Your Atlassian API token (stored locally)")
			.addText((text) => {
				text.setPlaceholder("Enter your API token")
					.setValue(this.plugin.settings.atlassianApiToken)
					.onChange(async (value) => {
						this.plugin.settings.atlassianApiToken = value;
						await this.plugin.saveSettings();
					});
				// Set input type to password to mask the token
				text.inputEl.type = "password";
				text.inputEl.autocomplete = "off";
			});

		// Folder Mappings section
		containerEl.createEl("h3", {
			text: "Folder Mappings",
		});

		containerEl.createEl("p", {
			text: "Map local Obsidian folders to specific Confluence parent pages. Files in mapped folders will be published to their corresponding Confluence parent.",
			cls: "setting-item-description",
		});

		// Default fallback parent ID
		const defaultParentSetting = new Setting(containerEl)
			.setName("Default Parent Page ID")
			.setDesc(
				"Fallback parent page for files not matching any folder mapping (optional)",
			);

		// Container for the page title display
		let defaultTitleEl: HTMLElement | null = null;

		defaultParentSetting
			.addText((text) => {
				text.setPlaceholder("Page ID (optional)")
					.setValue(
						this.plugin.settings.defaultConfluenceParentId || "",
					)
					.onChange(async (value) => {
						this.plugin.settings.defaultConfluenceParentId = value;
						await this.plugin.saveSettings();
						// Clear the title display when value changes
						if (defaultTitleEl) {
							defaultTitleEl.empty();
						}
					});
			})
			.addButton((button) => {
				button
					.setIcon("checkmark")
					.setTooltip("Validate page ID")
					.onClick(async () => {
						const pageId =
							this.plugin.settings.defaultConfluenceParentId;
						if (!pageId) {
							new Notice("No page ID to validate");
							return;
						}

						button.setDisabled(true);
						const result = await this.validatePageId(pageId);
						button.setDisabled(false);

						if (result.valid && defaultTitleEl) {
							defaultTitleEl.empty();
							defaultTitleEl.createSpan({
								text: `✓ ${result.title}`,
								cls: "confluence-page-title-valid",
							});
							new Notice(`Valid: ${result.title}`);
						} else {
							if (defaultTitleEl) {
								defaultTitleEl.empty();
								defaultTitleEl.createSpan({
									text: `✗ ${result.error}`,
									cls: "confluence-page-title-invalid",
								});
							}
							new Notice(`Invalid: ${result.error}`);
						}
					});
			});

		// Add title display element
		defaultTitleEl = defaultParentSetting.settingEl.createDiv({
			cls: "confluence-page-title",
		});

		// Container for folder mappings
		const mappingsContainer = containerEl.createEl("div", {
			cls: "folder-mappings-container",
		});

		// Get all folders for the dropdown
		const allFolders = this.getAllFolders();

		// Function to render a single folder mapping
		const renderFolderMapping = (mapping: FolderMapping, index: number) => {
			const mappingContainer = mappingsContainer.createDiv({
				cls: "folder-mapping-item",
			});

			const mappingSetting = new Setting(mappingContainer)
				.setName(`Mapping ${index + 1}`)
				.setDesc("");

			// Build folder options with hierarchy display
			const folderOptions: Record<string, string> = {};
			for (const folderPath of allFolders) {
				folderOptions[folderPath] =
					this.formatFolderDisplay(folderPath);
			}

			// Add dropdown for folder selection
			mappingSetting.addDropdown((dropdown) => {
				dropdown
					.addOptions(folderOptions)
					.setValue(mapping.localFolder || allFolders[0] || "")
					.onChange(async (value) => {
						mapping.localFolder = value;
						await this.plugin.saveSettings();
					});
				// Make dropdown wider to show hierarchy
				dropdown.selectEl.style.minWidth = "200px";
			});

			// Add text input for Confluence parent page ID
			let textInput: HTMLInputElement;
			mappingSetting.addText((text) => {
				textInput = text.inputEl;
				text.setPlaceholder("Confluence Parent Page ID")
					.setValue(mapping.confluenceParentId || "")
					.onChange(async (value) => {
						mapping.confluenceParentId = value;
						await this.plugin.saveSettings();
						// Clear the title display when value changes
						if (titleEl) {
							titleEl.empty();
						}
					});
			});

			// Add validate button
			mappingSetting.addButton((button) => {
				button
					.setIcon("checkmark")
					.setTooltip("Validate page ID")
					.onClick(async () => {
						const pageId = mapping.confluenceParentId;
						if (!pageId) {
							new Notice("No page ID to validate");
							return;
						}

						button.setDisabled(true);
						const result = await this.validatePageId(pageId);
						button.setDisabled(false);

						if (result.valid && titleEl) {
							titleEl.empty();
							titleEl.createSpan({
								text: `✓ ${result.title}`,
								cls: "confluence-page-title-valid",
							});
						} else if (titleEl) {
							titleEl.empty();
							titleEl.createSpan({
								text: `✗ ${result.error}`,
								cls: "confluence-page-title-invalid",
							});
						}
					});
			});

			// Add remove button
			mappingSetting.addButton((button) => {
				button
					.setIcon("trash")
					.setTooltip("Remove this mapping")
					.onClick(async () => {
						this.plugin.settings.folderMappings?.splice(index, 1);
						await this.plugin.saveSettings();
						this.display(); // Refresh the settings UI
					});
			});

			// Add title display below the setting
			const titleEl = mappingContainer.createDiv({
				cls: "confluence-page-title",
			});

			// Auto-fetch title if we have a page ID
			if (mapping.confluenceParentId) {
				this.fetchPageTitle(mapping.confluenceParentId).then(
					(title) => {
						if (title && titleEl) {
							titleEl.createSpan({
								text: `→ ${title}`,
								cls: "confluence-page-title-info",
							});
						}
					},
				);
			}
		};

		// Render existing mappings
		if (this.plugin.settings.folderMappings) {
			this.plugin.settings.folderMappings.forEach((mapping, index) => {
				renderFolderMapping(mapping, index);
			});
		}

		// Add button to add new mapping
		new Setting(containerEl)
			.setName("Add Folder Mapping")
			.setDesc("Add a new folder mapping")
			.addButton((button) => {
				button
					.setButtonText("+ Add Mapping")
					.setCta()
					.onClick(async () => {
						if (!this.plugin.settings.folderMappings) {
							this.plugin.settings.folderMappings = [];
						}
						this.plugin.settings.folderMappings.push({
							localFolder: allFolders[0] || "",
							confluenceParentId: "",
						});
						await this.plugin.saveSettings();
						this.display();
					});
			});

		// Bulk operations section
		containerEl.createEl("h4", {
			text: "Bulk Operations",
		});

		new Setting(containerEl)
			.setName("Export Mappings")
			.setDesc("Export all folder mappings to JSON")
			.addButton((button) => {
				button.setButtonText("Export").onClick(async () => {
					const json = this.exportMappings();
					await navigator.clipboard.writeText(json);
					new Notice("Mappings copied to clipboard!");
				});
			})
			.addButton((button) => {
				button.setButtonText("Download").onClick(() => {
					const json = this.exportMappings();
					const blob = new Blob([json], { type: "application/json" });
					const url = URL.createObjectURL(blob);
					const a = document.createElement("a");
					a.href = url;
					a.download = "confluence-mappings.json";
					a.click();
					URL.revokeObjectURL(url);
					new Notice("Mappings downloaded!");
				});
			});

		new Setting(containerEl)
			.setName("Import Mappings")
			.setDesc("Import folder mappings from JSON (replaces existing)")
			.addButton((button) => {
				button
					.setButtonText("Import from Clipboard")
					.onClick(async () => {
						try {
							const json = await navigator.clipboard.readText();
							await this.importMappings(json);
						} catch {
							new Notice("Failed to read from clipboard");
						}
					});
			})
			.addButton((button) => {
				button.setButtonText("Import from File").onClick(() => {
					const input = document.createElement("input");
					input.type = "file";
					input.accept = ".json";
					input.onchange = async (e) => {
						const file = (e.target as HTMLInputElement).files?.[0];
						if (file) {
							const text = await file.text();
							await this.importMappings(text);
						}
					};
					input.click();
				});
			});

		// Other settings
		containerEl.createEl("h3", {
			text: "Other Settings",
		});

		new Setting(containerEl)
			.setName("First Header Page Name")
			.setDesc("First header replaces file name as page title")
			.addToggle((toggle) =>
				toggle
					.setValue(this.plugin.settings.firstHeadingPageTitle)
					.onChange(async (value) => {
						this.plugin.settings.firstHeadingPageTitle = value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(containerEl)
			.setName("Mermaid Diagram Theme")
			.setDesc("Pick the theme to apply to mermaid diagrams")
			.addDropdown((dropdown) => {
				/* eslint-disable @typescript-eslint/naming-convention */
				dropdown
					.addOptions({
						"match-obsidian": "Match Obsidian",
						"light-obsidian": "Obsidian Theme - Light",
						"dark-obsidian": "Obsidian Theme - Dark",
						default: "Mermaid - Default",
						neutral: "Mermaid - Neutral",
						dark: "Mermaid - Dark",
						forest: "Mermaid - Forest",
					})
					.setValue(this.plugin.settings.mermaidTheme)
					.onChange(async (value) => {
						// @ts-expect-error
						this.plugin.settings.mermaidTheme = value;
						await this.plugin.saveSettings();
					});
				/* eslint-enable @typescript-eslint/naming-convention */
			});

		// Add styles for the page title display
		this.addStyles();
	}

	private addStyles(): void {
		const styleId = "confluence-settings-styles";
		if (document.getElementById(styleId)) {
			return;
		}

		const style = document.createElement("style");
		style.id = styleId;
		style.textContent = `
			.folder-mapping-item {
				border-bottom: 1px solid var(--background-modifier-border);
				padding-bottom: 8px;
				margin-bottom: 8px;
			}
			.confluence-page-title {
				font-size: 0.85em;
				padding-left: 12px;
				margin-top: 4px;
				min-height: 1.2em;
			}
			.confluence-page-title-valid {
				color: var(--text-success);
			}
			.confluence-page-title-invalid {
				color: var(--text-error);
			}
			.confluence-page-title-info {
				color: var(--text-muted);
			}
		`;
		document.head.appendChild(style);
	}
}
