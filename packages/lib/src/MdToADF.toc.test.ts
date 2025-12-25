/* eslint-disable @typescript-eslint/naming-convention */
import { expect, test, describe } from "@jest/globals";
import { MarkdownFile } from "./adaptors";
import { convertMDtoADF } from "./MdToADF";
import { ConfluenceSettings } from "./Settings";

const settings: ConfluenceSettings = {
	confluenceBaseUrl: "https://example.com",
	confluenceParentId: "asdf",
	atlassianUserName: "asdf@asdf.com",
	atlassianApiToken: "asdfasdf",
	folderToPublish: ".",
	contentRoot: "./",
	firstHeadingPageTitle: false,
};

describe("TOC conversion", () => {
	test("converts [toc] to bodiedExtension", () => {
		const markdown: MarkdownFile = {
			folderName: "test",
			absoluteFilePath: "/path/to/test.md",
			fileName: "test.md",
			contents: "[toc]\n\n# Header 1\n\n## Header 2",
			pageTitle: "Test",
			frontmatter: {},
		};

		const adfFile = convertMDtoADF(markdown, settings);
		const adfContent = adfFile.contents.content;

		// Find the TOC extension node
		const tocNode = adfContent?.find(
			(node) =>
				node.type === "bodiedExtension" &&
				node.attrs?.extensionKey === "toc" &&
				node.attrs?.extensionType ===
					"com.atlassian.confluence.macro.core",
		);

		expect(tocNode).toBeDefined();
		expect(tocNode?.attrs?.extensionKey).toBe("toc");
		expect(tocNode?.attrs?.extensionType).toBe(
			"com.atlassian.confluence.macro.core",
		);
		expect(tocNode?.attrs?.parameters?.macroParams?.outline?.value).toBe(
			"clear",
		);
		expect(tocNode?.attrs?.parameters?.macroParams?.maxLevel?.value).toBe(
			"7",
		);
		expect(tocNode?.attrs?.parameters?.macroParams?.minLevel?.value).toBe(
			"1",
		);
	});

	test("converts <!-- toc --> to bodiedExtension", () => {
		const markdown: MarkdownFile = {
			folderName: "test",
			absoluteFilePath: "/path/to/test.md",
			fileName: "test.md",
			contents: "<!-- toc -->\n\n# Header 1\n\n## Header 2",
			pageTitle: "Test",
			frontmatter: {},
		};

		const adfFile = convertMDtoADF(markdown, settings);
		const adfContent = adfFile.contents.content;

		// Find the TOC extension node
		const tocNode = adfContent?.find(
			(node) =>
				node.type === "bodiedExtension" &&
				node.attrs?.extensionKey === "toc" &&
				node.attrs?.extensionType ===
					"com.atlassian.confluence.macro.core",
		);

		expect(tocNode).toBeDefined();
		expect(tocNode?.attrs?.extensionKey).toBe("toc");
	});

	test("preserves headings after TOC", () => {
		const markdown: MarkdownFile = {
			folderName: "test",
			absoluteFilePath: "/path/to/test.md",
			fileName: "test.md",
			contents: "[toc]\n\n# Header 1\n\n## Header 2\n\n### Header 3",
			pageTitle: "Test",
			frontmatter: {},
		};

		const adfFile = convertMDtoADF(markdown, settings);
		const adfContent = adfFile.contents.content;

		// Should have TOC node
		const tocNode = adfContent?.find(
			(node) =>
				node.type === "bodiedExtension" &&
				node.attrs?.extensionKey === "toc",
		);
		expect(tocNode).toBeDefined();

		// Should have heading nodes after TOC
		const headings = adfContent?.filter((node) => node.type === "heading");
		expect(headings?.length).toBeGreaterThanOrEqual(3);
		expect(headings?.[0]?.attrs?.level).toBe(1);
		expect(headings?.[1]?.attrs?.level).toBe(2);
		expect(headings?.[2]?.attrs?.level).toBe(3);
	});

	test("handles multiple TOC markers", () => {
		const markdown: MarkdownFile = {
			folderName: "test",
			absoluteFilePath: "/path/to/test.md",
			fileName: "test.md",
			contents: "[toc]\n\n# Header 1\n\n[toc]\n\n## Header 2",
			pageTitle: "Test",
			frontmatter: {},
		};

		const adfFile = convertMDtoADF(markdown, settings);
		const adfContent = adfFile.contents.content;

		// Should have multiple TOC nodes
		const tocNodes = adfContent?.filter(
			(node) =>
				node.type === "bodiedExtension" &&
				node.attrs?.extensionKey === "toc",
		);
		expect(tocNodes?.length).toBe(2);
	});

	test("case insensitive [toc] matching", () => {
		const markdown: MarkdownFile = {
			folderName: "test",
			absoluteFilePath: "/path/to/test.md",
			fileName: "test.md",
			contents: "[TOC]\n\n# Header 1",
			pageTitle: "Test",
			frontmatter: {},
		};

		const adfFile = convertMDtoADF(markdown, settings);
		const adfContent = adfFile.contents.content;

		const tocNode = adfContent?.find(
			(node) =>
				node.type === "bodiedExtension" &&
				node.attrs?.extensionKey === "toc",
		);
		expect(tocNode).toBeDefined();
	});
});
