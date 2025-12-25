import { App, Setting, PluginSettingTab, TFolder } from "obsidian";
import ConfluencePlugin from "./main";

export class ConfluenceSettingTab extends PluginSettingTab {
	plugin: ConfluencePlugin;

	constructor(app: App, plugin: ConfluencePlugin) {
		super(app, plugin);
		this.plugin = plugin;
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
			.setName("Confluence Parent Page ID")
			.setDesc("Page ID to publish files under")
			.addText((text) =>
				text
					.setPlaceholder("23232345645")
					.setValue(this.plugin.settings.confluenceParentId)
					.onChange(async (value) => {
						this.plugin.settings.confluenceParentId = value;
						await this.plugin.saveSettings();
					}),
			);

		// Folder to publish setting with dropdown for Confluence directory
		const confluenceFolders = this.getConfluenceFolders();
		const confluenceFolderExists = confluenceFolders.length > 0;

		const folderSetting = new Setting(containerEl)
			.setName("Folder to publish")
			.setDesc(
				confluenceFolderExists
					? "Select a folder from the Confluence directory to publish"
					: "Create a 'Confluence' directory in your vault with subfolders to enable folder selection",
			);

		if (confluenceFolderExists) {
			// Create dropdown with folders from Confluence directory
			const folderOptions: Record<string, string> = {};
			for (const folderPath of confluenceFolders) {
				// Use just the folder name (last part of path) as the display name
				const folderName = folderPath.split("/").pop() || folderPath;
				folderOptions[folderPath] = folderName;
			}

			folderSetting.addDropdown((dropdown) => {
				dropdown
					.addOptions(folderOptions)
					.setValue(
						confluenceFolders.includes(
							this.plugin.settings.folderToPublish,
						)
							? this.plugin.settings.folderToPublish
							: confluenceFolders[0] || "",
					)
					.onChange(async (value) => {
						this.plugin.settings.folderToPublish = value;
						await this.plugin.saveSettings();
					});
			});
		} else {
			// Show text input (still allow manual entry for backwards compatibility)
			// but display a warning about creating the Confluence directory
			folderSetting.addText((text) => {
				text.setPlaceholder(
					"Enter folder path (e.g., 'Confluence/MyFolder')",
				)
					.setValue(this.plugin.settings.folderToPublish || "")
					.onChange(async (value) => {
						this.plugin.settings.folderToPublish = value;
						await this.plugin.saveSettings();
					});
			});

			// Add a warning note below the setting
			const noteEl = containerEl.createEl("div", {
				cls: "setting-item-description",
			});
			noteEl.createEl("p", {
				text: "⚠️ Please create a 'Confluence' directory in your vault root with subfolders to enable folder selection via dropdown.",
				cls: "mod-warning",
			});
		}

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
