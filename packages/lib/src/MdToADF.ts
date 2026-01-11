import {
	JSONDocNode,
	JSONTransformer,
} from "@atlaskit/editor-json-transformer";
import { MarkdownTransformer } from "./MarkdownTransformer";
import { traverse } from "@atlaskit/adf-utils/traverse";
import { MarkdownFile } from "./adaptors";
import { LocalAdfFile } from "./Publisher";
import { processConniePerPageConfig } from "./ConniePageConfig";
import { p } from "@atlaskit/adf-utils/builders";
import { MarkdownToConfluenceCodeBlockLanguageMap } from "./CodeBlockLanguageMap";
import { isSafeUrl } from "@atlaskit/adf-schema";
import { ConfluenceSettings } from "./Settings";
import { cleanUpUrlIfConfluence } from "./ConfluenceUrlParser";

const frontmatterRegex = /^\s*?---\n([\s\S]*?)\n---\s*/g;

const transformer = new MarkdownTransformer();
const serializer = new JSONTransformer();

export function parseMarkdownToADF(
	markdown: string,
	confluenceBaseUrl: string,
) {
	const prosenodes = transformer.parse(markdown);
	// Type cast to work around prosemirror-model version mismatch
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const adfNodes = serializer.encode(prosenodes as unknown as any);
	const nodes = processADF(adfNodes, confluenceBaseUrl);
	return nodes;
}

// Helper function to check if a paragraph contains only [toc] or <!-- toc -->
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isTocParagraph(node: any): boolean {
	if (node.type !== "paragraph" || !node.content) {
		return false;
	}

	// Check if paragraph contains only text nodes with [toc] or <!-- toc -->
	const textContent = node.content
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		.filter((child: any) => child.type === "text")
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		.map((child: any) => child.text || "")
		.join("")
		.trim();

	// Match [toc] or <!-- toc --> (case insensitive, with optional whitespace)
	const tocRegex = /^\[toc\]$/i;
	const tocCommentRegex = /^<!--\s*toc\s*-->$/i;

	return tocRegex.test(textContent) || tocCommentRegex.test(textContent);
}

// Helper function to create a TOC bodiedExtension node
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createTocExtensionNode(): any {
	const localId = `toc-${Date.now()}-${Math.random()
		.toString(36)
		.substr(2, 9)}`;

	return {
		type: "bodiedExtension",
		attrs: {
			extensionType: "com.atlassian.confluence.macro.core",
			extensionKey: "toc",
			parameters: {
				macroParams: {
					outline: { value: "clear" },
					maxLevel: { value: "7" },
					indent: { value: "20px" },
					minLevel: { value: "1" },
					type: { value: "list" },
					class: { value: "toc" },
					style: { value: "disc" },
					exclude: { value: "" },
					printable: { value: "true" },
					include: { value: "" },
				},
				macroMetadata: {
					macroId: {
						value: "toc",
					},
					schemaVersion: { value: "1" },
					title: "Table of Contents",
				},
			},
			localId: localId,
		},
		content: [],
	};
}

function processADF(adf: JSONDocNode, confluenceBaseUrl: string): JSONDocNode {
	// First pass: convert TOC paragraphs to bodiedExtension nodes
	// We need to process the content array directly since traverse doesn't let us replace nodes
	if (adf.content && Array.isArray(adf.content)) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		adf.content = adf.content.map((node: any) => {
			if (isTocParagraph(node)) {
				return createTocExtensionNode();
			}
			return node;
		});
	}

	const olivia = traverse(adf, {
		text: (node, _parent) => {
			if (_parent.parent?.node?.type == "listItem" && node.text) {
				node.text = node.text
					.replaceAll(/^\[[xX]\]/g, "✅")
					.replaceAll(/^\[[ ]\]/g, "🔲")
					.replaceAll(/^\[[*]\]/g, "⭐️");
			}

			if (
				!(
					node.marks &&
					node.marks[0] &&
					node.marks[0].type === "link" &&
					node.marks[0].attrs &&
					"href" in node.marks[0].attrs
				)
			) {
				return node;
			}

			if (
				node.marks[0].attrs["href"] === "" ||
				(!isSafeUrl(node.marks[0].attrs["href"]) &&
					!(node.marks[0].attrs["href"] as string).startsWith(
						"wikilinks:",
					) &&
					!(node.marks[0].attrs["href"] as string).startsWith(
						"mention:",
					))
			) {
				node.marks[0].attrs["href"] = "#";
			}

			if (node.marks[0].attrs["href"] === node.text) {
				const cleanedUrl = cleanUpUrlIfConfluence(
					node.marks[0].attrs["href"],
					confluenceBaseUrl,
				);
				node.type = "inlineCard";
				node.attrs = { url: cleanedUrl };
				delete node.marks;
				delete node.text;
			}

			return node;
		},
		table: (node, _parent) => {
			if (
				node.attrs &&
				"isNumberColumnEnabled" in node.attrs &&
				node.attrs["isNumberColumnEnabled"] === false
			) {
				delete node.attrs["isNumberColumnEnabled"];
			}
			return node;
		},
		tableRow: (node, _parent) => {
			return node;
		},
		tableHeader: (node, _parent) => {
			node.attrs = { colspan: 1, rowspan: 1, colwidth: [340] };
			return node;
		},
		tableCell: (node, _parent) => {
			node.attrs = { colspan: 1, rowspan: 1, colwidth: [340] };
			return node;
		},
		orderedList: (node, _parent) => {
			node.attrs = { order: 1 };
			return node;
		},
		codeBlock: (node, _parent) => {
			if (!node || !node.attrs) {
				return;
			}

			if (Object.keys(node.attrs).length === 0) {
				delete node.attrs;
				return node;
			}

			const codeBlockLanguage = (node.attrs || {})?.["language"];

			if (codeBlockLanguage in MarkdownToConfluenceCodeBlockLanguageMap) {
				node.attrs["language"] =
					MarkdownToConfluenceCodeBlockLanguageMap[codeBlockLanguage];
			}

			if (codeBlockLanguage === "adf") {
				if (!node?.content?.at(0)?.text) {
					return node;
				}
				try {
					const parsedAdf = JSON.parse(
						node?.content?.at(0)?.text ??
							JSON.stringify(
								p("ADF missing from ADF Code Block."),
							),
					);
					node = parsedAdf;
					return node;
				} catch (e) {
					return node;
				}
			}

			return node;
		},
	});

	if (!olivia) {
		throw new Error("Failed to traverse");
	}

	return olivia as JSONDocNode;
}

export function convertMDtoADF(
	file: MarkdownFile,
	settings: ConfluenceSettings,
): LocalAdfFile {
	file.contents = file.contents.replace(frontmatterRegex, "");

	const adfContent = parseMarkdownToADF(
		file.contents,
		settings.confluenceBaseUrl,
	);

	const results = processConniePerPageConfig(file, settings, adfContent);

	return {
		...file,
		...results,
		contents: adfContent,
	};
}
