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

describe("Callout conversion", () => {
	test("callout should not have <br> tag at the top", () => {
		const markdown: MarkdownFile = {
			folderName: "test",
			absoluteFilePath: "/path/to/test.md",
			fileName: "test.md",
			contents:
				"> [!INFO]\n> **Need Intra ID access?** If you're unable to log into your Intra ID account, request access by asking in Slack **#devops**. This is the only non-self-service item.",
			pageTitle: "Test",
			frontmatter: {},
		};

		const adfFile = convertMDtoADF(markdown, settings);
		const adfContent = adfFile.contents.content;

		// Find the panel node
		const panelNode = adfContent?.find(
			(node) => node.type === "panel" && node.attrs?.panelType === "info",
		);

		expect(panelNode).toBeDefined();

		// Check that the first content in the panel is not a hardBreak
		if (panelNode?.content && panelNode.content.length > 0) {
			const firstContent = panelNode.content[0];
			expect(firstContent.type).not.toBe("hardBreak");

			// If it's a paragraph, check that it doesn't start with a hardBreak
			if (firstContent.type === "paragraph" && firstContent.content) {
				const firstParagraphContent = firstContent.content[0];
				expect(firstParagraphContent?.type).not.toBe("hardBreak");
			}
		}

		// Verify the content is present
		const hasTextContent = JSON.stringify(panelNode).includes(
			"Need Intra ID access",
		);
		expect(hasTextContent).toBe(true);
	});

	test("callout with multiple paragraphs should not have <br> at top", () => {
		const markdown: MarkdownFile = {
			folderName: "test",
			absoluteFilePath: "/path/to/test.md",
			fileName: "test.md",
			contents:
				"> [!WARNING]\n> This is the first paragraph.\n> \n> This is the second paragraph.",
			pageTitle: "Test",
			frontmatter: {},
		};

		const adfFile = convertMDtoADF(markdown, settings);
		const adfContent = adfFile.contents.content;

		const panelNode = adfContent?.find(
			(node) =>
				node.type === "panel" && node.attrs?.panelType === "warning",
		);

		expect(panelNode).toBeDefined();

		// First content should not be a hardBreak
		if (panelNode?.content && panelNode.content.length > 0) {
			const firstContent = panelNode.content[0];
			expect(firstContent.type).not.toBe("hardBreak");
		}
	});

	test("callout content should start with actual text, not break", () => {
		const markdown: MarkdownFile = {
			folderName: "test",
			absoluteFilePath: "/path/to/test.md",
			fileName: "test.md",
			contents:
				"> [!INFO]\n> **Need Intra ID access?** If you're unable to log into your Intra ID account, request access by asking in Slack **#devops**. This is the only non-self-service item.",
			pageTitle: "Test",
			frontmatter: {},
		};

		const adfFile = convertMDtoADF(markdown, settings);
		const adfContent = adfFile.contents.content;

		const panelNode = adfContent?.find(
			(node) => node.type === "panel" && node.attrs?.panelType === "info",
		);

		expect(panelNode).toBeDefined();

		// Find the first content node in the panel
		if (panelNode?.content && panelNode.content.length > 0) {
			const firstContentJson = JSON.stringify(panelNode.content[0]);

			// The first content should not be a hardBreak
			expect(firstContentJson).not.toContain('"type":"hardBreak"');

			// If it's a paragraph, check its first child
			if (
				panelNode.content[0].type === "paragraph" &&
				panelNode.content[0].content
			) {
				if (panelNode.content[0].content.length > 0) {
					const firstChild = panelNode.content[0].content[0];
					expect(firstChild.type).not.toBe("hardBreak");
				}
			}
		}
	});
});
