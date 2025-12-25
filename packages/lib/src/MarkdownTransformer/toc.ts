import type MarkdownIt from "markdown-it";
import type StateCore from "markdown-it/lib/rules_core/state_core";
import type Token from "markdown-it/lib/token";

// Match [toc] or <!-- toc --> patterns
const tocRegex = /^\[toc\]$/i;
const tocCommentRegex = /^<!--\s*toc\s*-->$/i;

export default function tocPlugin(md: MarkdownIt): void {
	md.core.ruler.push("toc", toc);
}

export function toc(state: StateCore): boolean {
	const newTokens = state.tokens.reduce(
		(previousTokens: Token[], token: Token) => {
			// Check if this is a paragraph token that contains a TOC marker
			if (token.type === "paragraph") {
				const content = token.content || "";

				// Check for [toc] pattern
				if (tocRegex.test(content.trim())) {
					// Replace the paragraph with a TOC extension token
					const tocToken = new state.Token("toc", "", 0);
					tocToken.markup = "[toc]";
					tocToken.block = true;
					tocToken.nesting = 0; // Self-closing
					return [...previousTokens, tocToken];
				}

				// Check for <!-- toc --> pattern in HTML comment tokens
				// HTML comments are typically parsed as separate tokens
				if (tocCommentRegex.test(content.trim())) {
					const tocToken = new state.Token("toc", "", 0);
					tocToken.markup = "<!-- toc -->";
					tocToken.block = true;
					tocToken.nesting = 0; // Self-closing
					return [...previousTokens, tocToken];
				}
			}

			// Check for HTML comment tokens (markdown-it may parse <!-- toc --> as html_inline)
			if (token.type === "html_inline" || token.type === "html_block") {
				const content = token.content || "";
				if (tocCommentRegex.test(content.trim())) {
					const tocToken = new state.Token("toc", "", 0);
					tocToken.markup = "<!-- toc -->";
					tocToken.block = true;
					tocToken.nesting = 0; // Self-closing
					return [...previousTokens, tocToken];
				}
			}

			return [...previousTokens, token];
		},
		[] as Token[],
	);

	state.tokens = newTokens;
	return true;
}
