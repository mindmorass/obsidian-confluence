import { App, Setting, PluginSettingTab, TFolder } from "obsidian";
import ConfluencePlugin, { FolderMapping } from "./main";

export class ConfluenceSettingTab extends PluginSettingTab {
	plugin: ConfluencePlugin;

	constructor(app: App, plugin: ConfluencePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	/**
	 * Get all root-level folders in the vault
	 */
	private getRootLevelFolders(): string[] {
		const rootFolders: string[] = [];
		const rootFiles = this.app.vault.getRoot().children;

		for (const child of rootFiles) {
			if (child instanceof TFolder) {
				rootFolders.push(child.path);
			}
		}

		return rootFolders.sort();
	}

	/**
	 * Get all root-level folders under the "Confluence" directory
	 */
	private getConfluenceFolders(): string[] {
		const confluenceFolder =
			this.app.vault.getAbstractFileByPath("Confluence");

		if (!confluenceFolder || !(confluenceFolder instanceof TFolder)) {
			return [];
		}

		// Get all direct children that are folders
		const folders: string[] = [];
		for (const child of confluenceFolder.children) {
			if (child instanceof TFolder) {
				folders.push(child.path);
			}
		}

		return folders.sort();
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
			.setDesc("")
			.addText((text) =>
				text
					.setPlaceholder("")
					.setValue(this.plugin.settings.atlassianApiToken)
					.onChange(async (value) => {
						this.plugin.settings.atlassianApiToken = value;
						await this.plugin.saveSettings();
					}),
			);

		new Setting(containerEl)
			.setName("Default Confluence Parent Page ID")
			.setDesc(
				"Default page ID to publish files under (used when no folder mapping matches)",
			)
			.addText((text) =>
				text
					.setPlaceholder("23232345645")
					.setValue(this.plugin.settings.confluenceParentId)
					.onChange(async (value) => {
						this.plugin.settings.confluenceParentId = value;
						await this.plugin.saveSettings();
					}),
			);

		// Folder Mappings section
		containerEl.createEl("h3", {
			text: "Folder Mappings",
		});

		containerEl.createEl("p", {
			text: "Map local Obsidian folders to specific Confluence parent pages. Files in mapped folders will be published to their corresponding Confluence parent. Files not in any mapped folder will use the default parent page ID above.",
			cls: "setting-item-description",
		});

		// Container for folder mappings
		const mappingsContainer = containerEl.createEl("div", {
			cls: "folder-mappings-container",
		});

		// Function to render a single folder mapping
		const renderFolderMapping = (mapping: FolderMapping, index: number) => {
			const mappingSetting = new Setting(mappingsContainer)
				.setName(`Mapping ${index + 1}`)
				.setDesc("Local folder and Confluence parent page ID");

			const rootFolders = this.getRootLevelFolders();
			const folderOptions: Record<string, string> = {};
			for (const folderPath of rootFolders) {
				const folderName = folderPath.split("/").pop() || folderPath;
				folderOptions[folderPath] = folderName;
			}

			// Add dropdown for folder selection
			mappingSetting.addDropdown((dropdown) => {
				dropdown
					.addOptions(folderOptions)
					.setValue(mapping.localFolder || rootFolders[0] || "")
					.onChange(async (value) => {
						mapping.localFolder = value;
						await this.plugin.saveSettings();
					});
			});

			// Add text input for Confluence parent page ID
			mappingSetting.addText((text) => {
				text.setPlaceholder("Confluence Parent Page ID")
					.setValue(mapping.confluenceParentId || "")
					.onChange(async (value) => {
						mapping.confluenceParentId = value;
						await this.plugin.saveSettings();
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
		};

		// Render existing mappings
		if (this.plugin.settings.folderMappings) {
			this.plugin.settings.folderMappings.forEach((mapping, index) => {
				renderFolderMapping(mapping, index);
			});
		}

		// Add button to add new mapping
		const addMappingSetting = new Setting(containerEl)
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
						const rootFolders = this.getRootLevelFolders();
						this.plugin.settings.folderMappings.push({
							localFolder: rootFolders[0] || "",
							confluenceParentId: "",
						});
						await this.plugin.saveSettings();
						this.display(); // Refresh the settings UI
					});
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
	}
}
