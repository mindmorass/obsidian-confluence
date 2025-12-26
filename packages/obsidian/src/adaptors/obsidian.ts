import { Vault, MetadataCache, App, TFile } from "obsidian";
import {
	ConfluenceUploadSettings,
	BinaryFile,
	FilesToUpload,
	LoaderAdaptor,
	MarkdownFile,
	ConfluencePageConfig,
} from "@markdown-confluence/lib";
import { lookup } from "mime-types";

export default class ObsidianAdaptor implements LoaderAdaptor {
	vault: Vault;
	metadataCache: MetadataCache;
	settings: ConfluenceUploadSettings.ConfluenceSettings;
	app: App;
	folderMappings?: Array<{ localFolder: string; confluenceParentId: string }>;

	constructor(
		vault: Vault,
		metadataCache: MetadataCache,
		settings: ConfluenceUploadSettings.ConfluenceSettings,
		app: App,
	) {
		this.vault = vault;
		this.metadataCache = metadataCache;
		// Store a reference to the settings object so updates are reflected immediately
		this.settings = settings;
		this.app = app;
	}

	// Method to update settings reference (in case settings object is replaced)
	updateSettings(
		settings: ConfluenceUploadSettings.ConfluenceSettings,
		folderMappings?: Array<{
			localFolder: string;
			confluenceParentId: string;
		}>,
	): void {
		this.settings = settings;
		this.folderMappings = folderMappings;
	}

	/**
	 * Get the Confluence parent ID for a file based on folder mappings
	 */
	getParentIdForFile(filePath: string): string | null {
		if (!this.folderMappings || this.folderMappings.length === 0) {
			return null; // No mappings, use default
		}

		const normalizedFilePath = filePath.replace(/\/$/, "");
		for (const mapping of this.folderMappings) {
			if (!mapping.localFolder || !mapping.confluenceParentId) {
				continue; // Skip incomplete mappings
			}
			const normalizedFolderPath = mapping.localFolder.replace(/\/$/, "");
			// Check if file is in this mapped folder or any subfolder
			if (
				normalizedFilePath === normalizedFolderPath ||
				normalizedFilePath.startsWith(normalizedFolderPath + "/")
			) {
				return mapping.confluenceParentId;
			}
		}
		return null; // No mapping found, use default
	}

	async getMarkdownFilesToUpload(): Promise<FilesToUpload> {
		const files = this.vault.getMarkdownFiles();
		const filesToPublish = [];
		for (const file of files) {
			try {
				if (file.path.endsWith(".excalidraw")) {
					continue;
				}

				const fileFM = this.metadataCache.getCache(file.path);
				if (!fileFM) {
					throw new Error("Missing File in Metadata Cache");
				}
				const frontMatter = fileFM.frontmatter;

				// Check if file should be published based on folder mappings
				// When folder mappings exist, only files matching those mappings are published
				let matchesFolder = false;

				if (this.folderMappings && this.folderMappings.length > 0) {
					// Only check folder mappings - no fallback to folderToPublish
					const normalizedFilePath = file.path.replace(/\/$/, "");
					for (const mapping of this.folderMappings) {
						if (
							!mapping.localFolder ||
							!mapping.confluenceParentId
						) {
							continue; // Skip incomplete mappings
						}
						const normalizedFolderPath =
							mapping.localFolder.replace(/\/$/, "");
						// Check if file is in this mapped folder or any subfolder
						if (
							normalizedFilePath === normalizedFolderPath ||
							normalizedFilePath.startsWith(
								normalizedFolderPath + "/",
							)
						) {
							matchesFolder = true;
							break; // Found a match, no need to check other mappings
						}
					}
				} else {
					// No folder mappings, use default folderToPublish behavior
					const folderToPublish =
						this.settings.folderToPublish?.trim() || "";

					if (folderToPublish === "" || folderToPublish === ".") {
						// Empty or "." means sync all files
						matchesFolder = true;
					} else {
						// Check if file is in the folder or any subfolder
						const normalizedFolderPath = folderToPublish.replace(
							/\/$/,
							"",
						);
						const normalizedFilePath = file.path.replace(/\/$/, "");

						matchesFolder =
							normalizedFilePath === normalizedFolderPath ||
							normalizedFilePath.startsWith(
								normalizedFolderPath + "/",
							);
					}
				}

				if (
					(matchesFolder &&
						(!frontMatter ||
							frontMatter["connie-publish"] !== false)) ||
					(frontMatter && frontMatter["connie-publish"] === true)
				) {
					filesToPublish.push(file);
				}
			} catch {
				//ignore
			}
		}
		const filesToUpload = [];

		for (const file of filesToPublish) {
			const markdownFile = await this.loadMarkdownFile(file.path);
			filesToUpload.push(markdownFile);
		}

		return filesToUpload;
	}

	async loadMarkdownFile(absoluteFilePath: string): Promise<MarkdownFile> {
		const file = this.app.vault.getAbstractFileByPath(absoluteFilePath);
		if (!(file instanceof TFile)) {
			throw new Error("Not a TFile");
		}

		const fileFM = this.metadataCache.getCache(file.path);
		if (!fileFM) {
			throw new Error("Missing File in Metadata Cache");
		}
		const frontMatter = fileFM.frontmatter;

		const parsedFrontMatter: Record<string, unknown> = {};
		if (frontMatter) {
			for (const [key, value] of Object.entries(frontMatter)) {
				parsedFrontMatter[key] = value;
			}
		}

		return {
			pageTitle: file.basename,
			folderName: file.parent?.name ?? "",
			absoluteFilePath: file.path,
			fileName: file.name,
			contents: await this.vault.cachedRead(file),
			frontmatter: parsedFrontMatter,
		};
	}

	async readBinary(
		path: string,
		referencedFromFilePath: string,
	): Promise<BinaryFile | false> {
		const testing = this.metadataCache.getFirstLinkpathDest(
			path,
			referencedFromFilePath,
		);
		if (testing) {
			const files = await this.vault.readBinary(testing);
			const mimeType =
				lookup(testing.extension) || "application/octet-stream";
			return {
				contents: files,
				filePath: testing.path,
				filename: testing.name,
				mimeType: mimeType,
			};
		}

		return false;
	}
	async updateMarkdownValues(
		absoluteFilePath: string,
		values: Partial<ConfluencePageConfig.ConfluencePerPageAllValues>,
	): Promise<void> {
		const config = ConfluencePageConfig.conniePerPageConfig;
		const file = this.app.vault.getAbstractFileByPath(absoluteFilePath);
		if (file instanceof TFile) {
			this.app.fileManager.processFrontMatter(file, (fm) => {
				for (const propertyKey in config) {
					if (!config.hasOwnProperty(propertyKey)) {
						continue;
					}

					const { key } =
						config[
							propertyKey as keyof ConfluencePageConfig.ConfluencePerPageConfig
						];
					const value =
						values[
							propertyKey as keyof ConfluencePageConfig.ConfluencePerPageAllValues
						];
					if (propertyKey in values) {
						fm[key] = value;
					}
				}
			});
		}
	}
}
