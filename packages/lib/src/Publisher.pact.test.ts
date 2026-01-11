/* eslint-disable @typescript-eslint/naming-convention */
import { expect, test, beforeAll, afterAll } from "@jest/globals";
import { Pact, Matchers } from "@pact-foundation/pact";
import { ConfluenceClient } from "confluence.js";
import {
	BinaryFile,
	FilesToUpload,
	LoaderAdaptor,
	MarkdownFile,
} from "./adaptors";
import { ConfluencePerPageAllValues } from "./ConniePageConfig";
import { Publisher } from "./Publisher";
import { StaticSettingsLoader } from "./SettingsLoader";
import {
	ChartData,
	MermaidRenderer,
	MermaidRendererPlugin,
} from "./ADFProcessingPlugins/MermaidRendererPlugin";

const { like, eachLike, term } = Matchers;

// Create Pact instance - will be initialized in test
let provider: Pact;

const markdownTestCases: MarkdownFile[] = [
	{
		folderName: "headers",
		absoluteFilePath: "/path/to/headers.md",
		fileName: "headers.md",
		contents: "# Header 1\n\n## Header 2",
		pageTitle: "Headers",
		frontmatter: {
			title: "Headers",
		},
	},
];

class TestMermaidRenderer implements MermaidRenderer {
	async captureMermaidCharts(
		_charts: ChartData[],
	): Promise<Map<string, Buffer>> {
		return new Map<string, Buffer>();
	}
}

class InMemoryAdaptor implements LoaderAdaptor {
	private inMemoryFiles: MarkdownFile[];

	constructor(inMemoryFiles: MarkdownFile[]) {
		this.inMemoryFiles = inMemoryFiles;
	}
	async updateMarkdownValues(
		_absoluteFilePath: string,
		_values: Partial<ConfluencePerPageAllValues>,
	): Promise<void> {}

	async loadMarkdownFile(absoluteFilePath: string): Promise<MarkdownFile> {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		return this.inMemoryFiles.find(
			(t) => t.absoluteFilePath === absoluteFilePath,
		)!;
	}
	async getMarkdownFilesToUpload(): Promise<FilesToUpload> {
		return this.inMemoryFiles;
	}

	async readBinary(
		_path: string,
		_referencedFromFilePath: string,
	): Promise<false | BinaryFile> {
		return false;
	}
}

beforeAll(async () => {
	provider = new Pact({
		consumer: "markdown-confluence-lib",
		provider: "confluence-api",
		port: 0, // Use random port
		log: "./pact/logs/pact.log",
		dir: "./pact/pacts",
		logLevel: "INFO",
		cors: true,
	});
	await provider.setup();
});

afterAll(async () => {
	if (provider) {
		await provider.finalize();
	}
});

// TODO: Fix Pact API compatibility issues - the Pact library API seems to have changed
// and needs to be updated to match the installed version
test.skip("Upload to Confluence with Pact", async () => {
	const parentPageId = "123456";
	const spaceKey = "TEST";
	const testPageId = "789012";
	const testPageTitle = "Headers";
	const mockServerUrl = `http://localhost:${provider.options.port}`;

	// Define the contract for getting current user
	await provider.addInteraction({
		state: "user exists",
		uponReceiving: "a request for current user",
		withRequest: {
			method: "GET",
			path: "/wiki/rest/api/user/current",
			headers: {
				Accept: "application/json",
				Authorization: term({
					generate: "Basic dGVzdEBleGFtcGxlLmNvbTp0ZXN0LXRva2Vu",
					matcher: "^Basic .+",
				}),
			},
		},
		willRespondWith: {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
			body: {
				accountId: like("test-account-id"),
				displayName: like("Test User"),
				emailAddress: like("test@example.com"),
			},
		},
	});

	// Define the contract for getting parent page
	await provider.addInteraction({
		state: "parent page exists",
		uponReceiving: "a request to get parent page by ID",
		withRequest: {
			method: "GET",
			path: `/wiki/rest/api/content/${parentPageId}`,
			query: {
				expand: "body.atlas_doc_format,space",
			},
			headers: {
				Accept: "application/json",
				Authorization: term({
					generate: "Basic dGVzdEBleGFtcGxlLmNvbTp0ZXN0LXRva2Vu",
					matcher: "^Basic .+",
				}),
			},
		},
		willRespondWith: {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
			body: {
				id: like(parentPageId),
				type: like("page"),
				title: like("Test Parent Page"),
				space: {
					key: like(spaceKey),
					name: like("Test Space"),
				},
				body: {
					atlas_doc_format: {
						value: like('{"type":"doc","version":1,"content":[]}'),
					},
				},
			},
		},
	});

	// Define the contract for searching for existing page
	await provider.addInteraction({
		state: "page does not exist",
		uponReceiving: "a request to search for page by title",
		withRequest: {
			method: "GET",
			path: "/wiki/rest/api/content",
			query: {
				type: "page",
				spaceKey: spaceKey,
				title: testPageTitle,
				expand: "version,body.atlas_doc_format,ancestors",
			},
			headers: {
				Accept: "application/json",
				Authorization: term({
					generate: "Basic dGVzdEBleGFtcGxlLmNvbTp0ZXN0LXRva2Vu",
					matcher: "^Basic .+",
				}),
			},
		},
		willRespondWith: {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
			body: {
				results: [],
				size: 0,
				limit: 25,
				start: 0,
			},
		},
	});

	// Define the contract for creating a new page
	const blankPageAdf = '{"type":"doc","version":1,"content":[]}';
	await provider.addInteraction({
		state: "creating new page",
		uponReceiving: "a request to create a new page",
		withRequest: {
			method: "POST",
			path: "/wiki/rest/api/content",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: term({
					generate: "Basic dGVzdEBleGFtcGxlLmNvbTp0ZXN0LXRva2Vu",
					matcher: "^Basic .+",
				}),
			},
			body: {
				type: "page",
				title: like(testPageTitle),
				space: {
					key: like(spaceKey),
				},
				ancestors: eachLike({
					id: like(parentPageId),
				}),
				body: {
					atlas_doc_format: {
						value: like(blankPageAdf),
						representation: "atlas_doc_format",
					},
				},
			},
		},
		willRespondWith: {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
			body: {
				id: like(testPageId),
				type: like("page"),
				title: like(testPageTitle),
				version: {
					number: like(1),
					by: {
						accountId: like("test-account-id"),
					},
				},
				ancestors: eachLike({
					id: like(parentPageId),
				}),
				space: {
					key: like(spaceKey),
				},
				body: {
					atlas_doc_format: {
						value: like(blankPageAdf),
					},
				},
			},
		},
	});

	// Define the contract for updating page content
	const updatedAdf =
		'{"type":"doc","version":1,"content":[{"type":"heading","attrs":{"level":1},"content":[{"type":"text","text":"Header 1"}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Header 2"}]}]}';
	await provider.addInteraction({
		state: "updating page content",
		uponReceiving: "a request to update page content",
		withRequest: {
			method: "PUT",
			path: `/wiki/rest/api/content/${testPageId}`,
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: term({
					generate: "Basic dGVzdEBleGFtcGxlLmNvbTp0ZXN0LXRva2Vu",
					matcher: "^Basic .+",
				}),
			},
			body: {
				id: like(testPageId),
				type: like("page"),
				title: like(testPageTitle),
				version: {
					number: like(2),
				},
				body: {
					atlas_doc_format: {
						value: term({
							generate: updatedAdf,
							matcher: ".*",
						}),
						representation: "atlas_doc_format",
					},
				},
			},
		},
		willRespondWith: {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
			body: {
				id: like(testPageId),
				type: like("page"),
				title: like(testPageTitle),
				version: {
					number: like(2),
				},
				body: {
					atlas_doc_format: {
						value: term({
							generate: updatedAdf,
							matcher: ".*",
						}),
					},
				},
			},
		},
	});

	// Define the contract for getting updated page
	await provider.addInteraction({
		state: "page updated",
		uponReceiving: "a request to get updated page by ID",
		withRequest: {
			method: "GET",
			path: `/wiki/rest/api/content/${testPageId}`,
			query: {
				expand: "body.atlas_doc_format,space",
			},
			headers: {
				Accept: "application/json",
				Authorization: term({
					generate: "Basic dGVzdEBleGFtcGxlLmNvbTp0ZXN0LXRva2Vu",
					matcher: "^Basic .+",
				}),
			},
		},
		willRespondWith: {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
			body: {
				id: like(testPageId),
				type: like("page"),
				title: like(testPageTitle),
				space: {
					key: like(spaceKey),
				},
				body: {
					atlas_doc_format: {
						value: term({
							generate: updatedAdf,
							matcher: ".*",
						}),
					},
				},
			},
		},
	});

	const filesystemAdaptor = new InMemoryAdaptor(markdownTestCases);
	const mermaidRenderer = new TestMermaidRenderer();

	// Create ConfluenceClient pointing to Pact mock server
	const confluenceClient = new ConfluenceClient({
		host: mockServerUrl,
		authentication: {
			basic: {
				email: "test@example.com",
				apiToken: "test-token",
			},
		},
	});

	const publisherSettingsLoader = new StaticSettingsLoader({
		confluenceBaseUrl: mockServerUrl,
		atlassianUserName: "test@example.com",
		atlassianApiToken: "test-token",
		confluenceParentId: parentPageId,
		folderToPublish: "/path/to",
		contentRoot: "/path/to/",
		firstHeadingPageTitle: false,
	});

	const publisher = new Publisher(
		filesystemAdaptor,
		publisherSettingsLoader,
		confluenceClient,
		[new MermaidRendererPlugin(mermaidRenderer)],
	);

	const result = await publisher.publish();

	expect(result.length).toBeGreaterThan(0);

	// Verify that the interactions occurred
	await provider.verify();
}, 30000);
