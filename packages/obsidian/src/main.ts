import { Plugin, Notice, MarkdownView, Workspace, loadMermaid } from "obsidian";
import {
	ConfluenceUploadSettings,
	Publisher,
	ConfluencePageConfig,
	StaticSettingsLoader,
	renderADFDoc,
	MermaidRendererPlugin,
	UploadAdfFileResult,
	LoaderAdaptor,
	MarkdownFile,
	FilesToUpload,
	BinaryFile,
} from "@markdown-confluence/lib";
import { ElectronMermaidRenderer } from "@markdown-confluence/mermaid-electron-renderer";
import { ConfluenceSettingTab } from "./ConfluenceSettingTab";
import ObsidianAdaptor from "./adaptors/obsidian";
import { CompletedModal } from "./CompletedModal";
import { ObsidianConfluenceClient } from "./MyBaseClient";
import {
	ConfluencePerPageForm,
	ConfluencePerPageUIValues,
	mapFrontmatterToConfluencePerPageUIValues,
} from "./ConfluencePerPageForm";
import { Mermaid } from "mermaid";

export interface FolderMapping {
	localFolder: string;
	confluenceParentId: string;
}

export interface ObsidianPluginSettings
	extends ConfluenceUploadSettings.ConfluenceSettings {
	mermaidTheme:
		| "match-obsidian"
		| "light-obsidian"
		| "dark-obsidian"
		| "default"
		| "neutral"
		| "dark"
		| "forest";
	folderMappings?: FolderMapping[];
}

interface FailedFile {
	fileName: string;
	reason: string;
}

interface UploadResults {
	errorMessage: string | null;
	failedFiles: FailedFile[];
	filesUploadResult: UploadAdfFileResult[];
}

export default class ConfluencePlugin extends Plugin {
	settings!: ObsidianPluginSettings;
	private isSyncing = false;
	workspace!: Workspace;
	publisher!: Publisher;
	adaptor!: ObsidianAdaptor;
	private confluenceClient!: ObsidianConfluenceClient;
	private mermaidRendererPlugin!: MermaidRendererPlugin;

	activeLeafPath(workspace: Workspace): string | undefined {
		const view = workspace.getActiveViewOfType(MarkdownView);
		return view?.file?.path;
	}

	async init() {
		await this.loadSettings();
		const { vault, metadataCache, workspace } = this.app;
		this.workspace = workspace;

		// If adaptor already exists, update its settings reference instead of recreating
		// This ensures the adaptor always uses the latest settings
		if (this.adaptor) {
			this.adaptor.updateSettings(
				this.settings,
				this.settings.folderMappings,
			);
		} else {
			this.adaptor = new ObsidianAdaptor(
				vault,
				metadataCache,
				this.settings,
				this.app,
			);
			// Set folderMappings after creation since constructor doesn't take it
			this.adaptor.updateSettings(
				this.settings,
				this.settings.folderMappings,
			);
		}

		const mermaidItems = await this.getMermaidItems();
		const mermaidRenderer = new ElectronMermaidRenderer(
			mermaidItems.extraStyleSheets,
			mermaidItems.extraStyles,
			mermaidItems.mermaidConfig,
			mermaidItems.bodyStyles,
		);
		this.confluenceClient = new ObsidianConfluenceClient({
			host: this.settings.confluenceBaseUrl,
			authentication: {
				basic: {
					email: this.settings.atlassianUserName,
					apiToken: this.settings.atlassianApiToken,
				},
			},
			middlewares: {
				onError(e) {
					if ("response" in e && e.response && "data" in e.response) {
						e.message =
							typeof e.response.data === "string"
								? e.response.data
								: JSON.stringify(e.response.data);
					}
				},
			},
		});

		// Always create a new StaticSettingsLoader with the current settings
		// This ensures the publisher always uses the latest settings
		const settingsLoader = new StaticSettingsLoader(this.settings);

		// Store mermaid renderer plugin for reuse
		this.mermaidRendererPlugin = new MermaidRendererPlugin(mermaidRenderer);

		// If publisher already exists, we need to recreate it with the new settings loader
		// since Publisher stores the settingsLoader reference
		this.publisher = new Publisher(
			this.adaptor,
			settingsLoader,
			this.confluenceClient,
			[this.mermaidRendererPlugin],
		);
	}

	async getMermaidItems() {
		const extraStyles: string[] = [];
		const extraStyleSheets: string[] = [];
		let bodyStyles = "";
		const body = document.querySelector("body") as HTMLBodyElement;

		switch (this.settings.mermaidTheme) {
			case "default":
			case "neutral":
			case "dark":
			case "forest":
				return {
					extraStyleSheets,
					extraStyles,
					mermaidConfig: { theme: this.settings.mermaidTheme },
					bodyStyles,
				};
			case "match-obsidian":
				bodyStyles = body.className;
				break;
			case "dark-obsidian":
				bodyStyles = "theme-dark";
				break;
			case "light-obsidian":
				bodyStyles = "theme-dark";
				break;
			default:
				throw new Error("Missing theme");
		}

		extraStyleSheets.push("app://obsidian.md/app.css");

		// @ts-expect-error
		const cssTheme = this.app.vault?.getConfig("cssTheme") as string;
		if (cssTheme) {
			const fileExists = await this.app.vault.adapter.exists(
				`.obsidian/themes/${cssTheme}/theme.css`,
			);
			if (fileExists) {
				const themeCss = await this.app.vault.adapter.read(
					`.obsidian/themes/${cssTheme}/theme.css`,
				);
				extraStyles.push(themeCss);
			}
		}

		const cssSnippets =
			// @ts-expect-error
			(this.app.vault?.getConfig("enabledCssSnippets") as string[]) ?? [];
		for (const snippet of cssSnippets) {
			const fileExists = await this.app.vault.adapter.exists(
				`.obsidian/snippets/${snippet}.css`,
			);
			if (fileExists) {
				const themeCss = await this.app.vault.adapter.read(
					`.obsidian/snippets/${snippet}.css`,
				);
				extraStyles.push(themeCss);
			}
		}

		return {
			extraStyleSheets,
			extraStyles,
			mermaidConfig: (
				(await loadMermaid()) as Mermaid
			).mermaidAPI.getConfig(),
			bodyStyles,
		};
	}

	async doPublish(publishFilter?: string): Promise<UploadResults> {
		const returnVal: UploadResults = {
			errorMessage: null,
			failedFiles: [],
			filesUploadResult: [],
		};

		// If folder mappings are configured, group files by parent ID and publish separately
		if (this.settings.folderMappings) {
			// Check if folder mappings array is empty
			if (this.settings.folderMappings.length === 0) {
				returnVal.errorMessage =
					"Nothing to sync. There are no Obsidian folder to Confluence mappings configured.";
				return returnVal;
			}

			// Get all files that should be published
			const allFiles = await this.adaptor.getMarkdownFilesToUpload();

			// Group files by their parent ID (based on folder mappings)
			const filesByParentId = new Map<string, typeof allFiles>();

			for (const file of allFiles) {
				// Apply publishFilter if specified
				if (publishFilter && file.absoluteFilePath !== publishFilter) {
					continue;
				}

				const parentId = this.adaptor.getParentIdForFile(
					file.absoluteFilePath,
				);
				// Only publish files that have a mapping - no default fallback
				if (parentId) {
					if (!filesByParentId.has(parentId)) {
						filesByParentId.set(parentId, []);
					}
					filesByParentId.get(parentId)!.push(file);
				}
				// Files without a mapping are skipped when folder mappings exist
			}

			// Create a filtered adaptor wrapper
			class FilteredAdaptor implements LoaderAdaptor {
				constructor(
					private baseAdaptor: LoaderAdaptor,
					private allowedFiles: typeof allFiles,
				) {}

				async getMarkdownFilesToUpload(): Promise<FilesToUpload> {
					return this.allowedFiles;
				}

				async loadMarkdownFile(
					absoluteFilePath: string,
				): Promise<MarkdownFile> {
					return this.baseAdaptor.loadMarkdownFile(absoluteFilePath);
				}

				async readBinary(
					path: string,
					referencedFromFilePath: string,
				): Promise<BinaryFile | false> {
					return this.baseAdaptor.readBinary(
						path,
						referencedFromFilePath,
					);
				}

				async updateMarkdownValues(
					absoluteFilePath: string,
					values: Partial<ConfluencePageConfig.ConfluencePerPageAllValues>,
				): Promise<void> {
					return this.baseAdaptor.updateMarkdownValues(
						absoluteFilePath,
						values,
					);
				}
			}

			// Check if no files matched any mapping
			if (filesByParentId.size === 0) {
				returnVal.errorMessage =
					"Nothing to sync. There are no Obsidian folder to Confluence mappings configured, or no files match the configured mappings.";
				return returnVal;
			}

			// Publish each group with its corresponding parent ID
			for (const [parentId, files] of filesByParentId.entries()) {
				try {
					// Create a temporary settings object with this parent ID
					const tempSettings = {
						...this.settings,
						confluenceParentId: parentId,
					};
					const tempSettingsLoader = new StaticSettingsLoader(
						tempSettings,
					);

					// Create a filtered adaptor that only returns files for this parent ID
					const filteredAdaptor = new FilteredAdaptor(
						this.adaptor,
						files,
					);

					// Create a temporary publisher with the modified settings and filtered adaptor
					const tempPublisher = new Publisher(
						filteredAdaptor,
						tempSettingsLoader,
						this.confluenceClient,
						[this.mermaidRendererPlugin],
					);

					const adrFiles = await tempPublisher.publish();

					adrFiles.forEach((element) => {
						if (element.successfulUploadResult) {
							returnVal.filesUploadResult.push(
								element.successfulUploadResult,
							);
							return;
						}

						returnVal.failedFiles.push({
							fileName: element.node.file.absoluteFilePath,
							reason: element.reason ?? "No Reason Provided",
						});
					});
				} catch (error) {
					returnVal.failedFiles.push({
						fileName: `Group with parent ID ${parentId}`,
						reason:
							error instanceof Error
								? error.message
								: String(error),
					});
				}
			}
		} else {
			// No folder mappings, use default behavior
			// But since we removed confluenceParentId from UI, we need to check if it's set
			if (
				!this.settings.confluenceParentId ||
				this.settings.confluenceParentId.trim() === ""
			) {
				returnVal.errorMessage =
					"Nothing to sync. Please configure folder mappings in the plugin settings. The default parent page ID setting has been removed.";
				return returnVal;
			}

			const adrFiles = await this.publisher.publish(publishFilter);

			adrFiles.forEach((element) => {
				if (element.successfulUploadResult) {
					returnVal.filesUploadResult.push(
						element.successfulUploadResult,
					);
					return;
				}

				returnVal.failedFiles.push({
					fileName: element.node.file.absoluteFilePath,
					reason: element.reason ?? "No Reason Provided",
				});
			});
		}

		return returnVal;
	}

	override async onload() {
		await this.init();

		// Register property types for frontmatter properties
		// This ensures Obsidian knows the correct types for these properties
		// Note: registerPropertyType may not be in the TypeScript definitions
		// but should be available at runtime in Obsidian
		// Types must match the actual values written:
		// - connie-publish: checkbox (boolean, displayed as checkbox in Obsidian)
		// - connie-page-id: text (string, stored as string)
		try {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const metadataCache = this.app.metadataCache as any;
			if (
				metadataCache &&
				typeof metadataCache.registerPropertyType === "function"
			) {
				metadataCache.registerPropertyType(
					"connie-publish",
					"checkbox",
				);
				metadataCache.registerPropertyType("connie-page-id", "text");
			}
		} catch (error) {
			// If property type registration fails, it's not critical
			// Obsidian will infer types from usage, though users may need to
			// manually correct types in their vault's .obsidian/types.json file
			console.warn("Failed to register property types:", error);
		}

		this.addRibbonIcon("cloud", "Publish to Confluence", async () => {
			if (this.isSyncing) {
				new Notice("Syncing already on going");
				return;
			}
			this.isSyncing = true;
			try {
				const stats = await this.doPublish();
				new CompletedModal(this.app, {
					uploadResults: stats,
				}).open();
			} catch (error) {
				if (error instanceof Error) {
					new CompletedModal(this.app, {
						uploadResults: {
							errorMessage: error.message,
							failedFiles: [],
							filesUploadResult: [],
						},
					}).open();
				} else {
					new CompletedModal(this.app, {
						uploadResults: {
							errorMessage: JSON.stringify(error),
							failedFiles: [],
							filesUploadResult: [],
						},
					}).open();
				}
			} finally {
				this.isSyncing = false;
			}
		});

		this.addCommand({
			id: "adf-to-markdown",
			name: "ADF To Markdown",
			callback: async () => {
				console.log("HMMMM");
				const json = JSON.parse(
					'{"type":"doc","content":[{"type":"paragraph","content":[{"text":"Testing","type":"text"}]}],"version":1}',
				);
				console.log({ json });

				const confluenceClient = new ObsidianConfluenceClient({
					host: this.settings.confluenceBaseUrl,
					authentication: {
						basic: {
							email: this.settings.atlassianUserName,
							apiToken: this.settings.atlassianApiToken,
						},
					},
				});
				const testingPage =
					await confluenceClient.content.getContentById({
						id: "9732097",
						expand: ["body.atlas_doc_format", "space"],
					});
				const adf = JSON.parse(
					testingPage.body?.atlas_doc_format?.value ||
						'{type: "doc", content:[]}',
				);
				renderADFDoc(adf);
			},
		});

		this.addCommand({
			id: "publish-current",
			name: "Publish Current File to Confluence",
			checkCallback: (checking: boolean) => {
				if (!this.isSyncing) {
					if (!checking) {
						this.isSyncing = true;
						this.doPublish(this.activeLeafPath(this.workspace))
							.then((stats) => {
								new CompletedModal(this.app, {
									uploadResults: stats,
								}).open();
							})
							.catch((error) => {
								if (error instanceof Error) {
									new CompletedModal(this.app, {
										uploadResults: {
											errorMessage: error.message,
											failedFiles: [],
											filesUploadResult: [],
										},
									}).open();
								} else {
									new CompletedModal(this.app, {
										uploadResults: {
											errorMessage: JSON.stringify(error),
											failedFiles: [],
											filesUploadResult: [],
										},
									}).open();
								}
							})
							.finally(() => {
								this.isSyncing = false;
							});
					}
					return true;
				}
				return true;
			},
		});

		this.addCommand({
			id: "publish-all",
			name: "Publish All to Confluence",
			checkCallback: (checking: boolean) => {
				if (!this.isSyncing) {
					if (!checking) {
						this.isSyncing = true;
						this.doPublish()
							.then((stats) => {
								new CompletedModal(this.app, {
									uploadResults: stats,
								}).open();
							})
							.catch((error) => {
								if (error instanceof Error) {
									new CompletedModal(this.app, {
										uploadResults: {
											errorMessage: error.message,
											failedFiles: [],
											filesUploadResult: [],
										},
									}).open();
								} else {
									new CompletedModal(this.app, {
										uploadResults: {
											errorMessage: JSON.stringify(error),
											failedFiles: [],
											filesUploadResult: [],
										},
									}).open();
								}
							})
							.finally(() => {
								this.isSyncing = false;
							});
					}
				}
				return true;
			},
		});

		this.addCommand({
			id: "enable-publishing",
			name: "Enable publishing to Confluence",
			editorCheckCallback: (checking, _editor, view) => {
				if (!view.file) {
					return false;
				}

				if (checking) {
					const frontMatter = this.app.metadataCache.getCache(
						view.file.path,
					)?.frontmatter;
					const file = view.file;
					// Check if file is in the folder or any subfolder
					// The folder selection is a parent folder - all files under it should be published
					const normalizedFolderPath =
						this.settings.folderToPublish.replace(/\/$/, "");
					const normalizedFilePath = file.path.replace(/\/$/, "");
					const isInFolder =
						normalizedFilePath === normalizedFolderPath ||
						normalizedFilePath.startsWith(
							normalizedFolderPath + "/",
						);
					const enabledForPublishing =
						(isInFolder &&
							(!frontMatter ||
								frontMatter["connie-publish"] !== false)) ||
						(frontMatter && frontMatter["connie-publish"] === true);
					return !enabledForPublishing;
				}

				this.app.fileManager.processFrontMatter(
					view.file,
					(frontmatter) => {
						if (view.file) {
							const normalizedFolderPath =
								this.settings.folderToPublish.replace(
									/\/$/,
									"",
								);
							const normalizedFilePath = view.file.path.replace(
								/\/$/,
								"",
							);
							let isInFolder = false;
							if (
								normalizedFilePath.startsWith(
									normalizedFolderPath,
								)
							) {
								const pathAfterFolder =
									normalizedFilePath.substring(
										normalizedFolderPath.length,
									);
								const remainingPath = pathAfterFolder.replace(
									/^\//,
									"",
								);
								isInFolder = !remainingPath.includes("/");
							}
							if (isInFolder) {
								delete frontmatter["connie-publish"];
							} else {
								frontmatter["connie-publish"] = true;
							}
						}
					},
				);
				return true;
			},
		});

		this.addCommand({
			id: "disable-publishing",
			name: "Disable publishing to Confluence",
			editorCheckCallback: (checking, _editor, view) => {
				if (!view.file) {
					return false;
				}

				if (checking) {
					const frontMatter = this.app.metadataCache.getCache(
						view.file.path,
					)?.frontmatter;
					const file = view.file;
					// Check if file is in the folder or any subfolder
					// The folder selection is a parent folder - all files under it should be published
					const normalizedFolderPath =
						this.settings.folderToPublish.replace(/\/$/, "");
					const normalizedFilePath = file.path.replace(/\/$/, "");
					const isInFolder =
						normalizedFilePath === normalizedFolderPath ||
						normalizedFilePath.startsWith(
							normalizedFolderPath + "/",
						);
					const enabledForPublishing =
						(isInFolder &&
							(!frontMatter ||
								frontMatter["connie-publish"] !== false)) ||
						(frontMatter && frontMatter["connie-publish"] === true);
					return enabledForPublishing;
				}

				this.app.fileManager.processFrontMatter(
					view.file,
					(frontmatter) => {
						if (view.file) {
							const normalizedFolderPath =
								this.settings.folderToPublish.replace(
									/\/$/,
									"",
								);
							const normalizedFilePath = view.file.path.replace(
								/\/$/,
								"",
							);
							let isInFolder = false;
							if (
								normalizedFilePath.startsWith(
									normalizedFolderPath,
								)
							) {
								const pathAfterFolder =
									normalizedFilePath.substring(
										normalizedFolderPath.length,
									);
								const remainingPath = pathAfterFolder.replace(
									/^\//,
									"",
								);
								isInFolder = !remainingPath.includes("/");
							}
							if (isInFolder) {
								frontmatter["connie-publish"] = false;
							} else {
								delete frontmatter["connie-publish"];
							}
						}
					},
				);
				return true;
			},
		});

		this.addCommand({
			id: "page-settings",
			name: "Update Confluence Page Settings",
			editorCallback: (_editor, view) => {
				if (!view.file) {
					return false;
				}

				const frontMatter = this.app.metadataCache.getCache(
					view.file.path,
				)?.frontmatter;

				const file = view.file;

				new ConfluencePerPageForm(this.app, {
					config: ConfluencePageConfig.conniePerPageConfig,
					initialValues:
						mapFrontmatterToConfluencePerPageUIValues(frontMatter),
					onSubmit: (values, close) => {
						const valuesToSet: Partial<ConfluencePageConfig.ConfluencePerPageAllValues> =
							{};
						for (const propertyKey in values) {
							if (
								Object.prototype.hasOwnProperty.call(
									values,
									propertyKey,
								)
							) {
								const element =
									values[
										propertyKey as keyof ConfluencePerPageUIValues
									];
								if (element.isSet) {
									valuesToSet[
										propertyKey as keyof ConfluencePerPageUIValues
									] = element.value as never;
								}
							}
						}
						this.adaptor.updateMarkdownValues(
							file.path,
							valuesToSet,
						);
						close();
					},
				}).open();
				return true;
			},
		});

		this.addSettingTab(new ConfluenceSettingTab(this.app, this));
	}

	override async onunload() {}

	async loadSettings() {
		const savedData = await this.loadData();
		this.settings = Object.assign(
			{},
			ConfluenceUploadSettings.DEFAULT_SETTINGS,
			{ mermaidTheme: "match-obsidian", folderMappings: [] },
			savedData,
		);
		// Ensure folderMappings is always an array and properly initialized
		if (!Array.isArray(this.settings.folderMappings)) {
			this.settings.folderMappings = [];
		}
		// Filter out invalid mappings (but allow mappings with empty confluenceParentId for new entries)
		if (this.settings.folderMappings) {
			this.settings.folderMappings = this.settings.folderMappings.filter(
				(mapping) => mapping && mapping.localFolder, // Only require localFolder, confluenceParentId can be empty for new mappings
			);
		}
	}

	async saveSettings() {
		await this.saveData(this.settings);
		await this.init();
	}
}
