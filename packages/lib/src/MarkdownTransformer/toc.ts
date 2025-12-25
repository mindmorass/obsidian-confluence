import type MarkdownIt from "markdown-it";
import type StateCore from "markdown-it/lib/rules_core/state_core";
import type Token from "markdown-it/lib/token";

// Match [toc] or <!-- toc --> patterns
const tocRegex = /^\[toc\]$/i;
const tocCommentRegex = /^<!--\s*toc\s*-->$/i;

export default function tocPlugin(md: MarkdownIt): void {
	md.core.ruler.push("toc", toc);
}

// Helper function to extract text content from a token and its children
function getTokenText(token: Token): string {
	// First check direct content
	if (token.content) {
		return token.content;
	}

	// If no direct content, check children
	if (token.children && token.children.length > 0) {
		return token.children
			.map((child) => {
				if (child.type === "text") {
					return child.content || "";
				}
				// Recursively get text from nested children
				return getTokenText(child);
			})
			.join("");
	}

	return "";
}

export function toc(state: StateCore): boolean {
	const tokensToSkip = new Set<number>();
	const newTokens: Token[] = [];

	for (let i = 0; i < state.tokens.length; i++) {
		const token = state.tokens[i];

		// Skip if token is undefined or already marked for removal
		if (!token || tokensToSkip.has(i)) {
			continue;
		}

		// Check if this is an inline token (which contains the actual text content)
		if (token.type === "inline") {
			const content = getTokenText(token);

			// Check for [toc] pattern
			if (tocRegex.test(content.trim())) {
				// Find the matching paragraph_open and paragraph_close
				let paraOpenIndex = i - 1;
				let paraCloseIndex = i + 1;

				// Look backwards for paragraph_open
				while (paraOpenIndex >= 0) {
					const token = state.tokens[paraOpenIndex];
					if (token && token.type === "paragraph_open") {
						break;
					}
					paraOpenIndex--;
				}

				// Look forwards for paragraph_close
				while (paraCloseIndex < state.tokens.length) {
					const token = state.tokens[paraCloseIndex];
					if (token && token.type === "paragraph_close") {
						break;
					}
					paraCloseIndex++;
				}

				// Mark paragraph_open, inline, and paragraph_close for removal
				if (paraOpenIndex >= 0) {
					tokensToSkip.add(paraOpenIndex);
				}
				tokensToSkip.add(i);
				if (paraCloseIndex < state.tokens.length) {
					tokensToSkip.add(paraCloseIndex);
				}

				// Create TOC tokens (open and close, like panel/expand)
				const tocOpenToken = new state.Token("toc_open", "", 0);
				tocOpenToken.markup = "[toc]";
				tocOpenToken.block = true;
				tocOpenToken.nesting = -1; // -1 for opening tokens
				newTokens.push(tocOpenToken);

				const tocCloseToken = new state.Token("toc_close", "", 0);
				tocCloseToken.markup = "[toc]";
				tocCloseToken.block = true;
				tocCloseToken.nesting = 1; // 1 for closing tokens
				newTokens.push(tocCloseToken);
				continue;
			}

			// Check for <!-- toc --> pattern
			if (tocCommentRegex.test(content.trim())) {
				// Find the matching paragraph_open and paragraph_close
				let paraOpenIndex = i - 1;
				let paraCloseIndex = i + 1;

				// Look backwards for paragraph_open
				while (paraOpenIndex >= 0) {
					const token = state.tokens[paraOpenIndex];
					if (token && token.type === "paragraph_open") {
						break;
					}
					paraOpenIndex--;
				}

				// Look forwards for paragraph_close
				while (paraCloseIndex < state.tokens.length) {
					const token = state.tokens[paraCloseIndex];
					if (token && token.type === "paragraph_close") {
						break;
					}
					paraCloseIndex++;
				}

				// Mark paragraph_open, inline, and paragraph_close for removal
				if (paraOpenIndex >= 0) {
					tokensToSkip.add(paraOpenIndex);
				}
				tokensToSkip.add(i);
				if (paraCloseIndex < state.tokens.length) {
					tokensToSkip.add(paraCloseIndex);
				}

				// Create TOC token
				const tocToken = new state.Token("toc", "", 0);
				tocToken.markup = "<!-- toc -->";
				tocToken.block = true;
				tocToken.nesting = 0; // Self-closing
				newTokens.push(tocToken);
				continue;
			}
		}

		// Check for HTML comment tokens (markdown-it may parse <!-- toc --> as html_inline or html_block)
		if (token.type === "html_inline" || token.type === "html_block") {
			const content = token.content || "";
			if (tocCommentRegex.test(content.trim())) {
				// Create TOC tokens (open and close, like panel/expand)
				const tocOpenToken = new state.Token("toc_open", "", 0);
				tocOpenToken.markup = "<!-- toc -->";
				tocOpenToken.block = true;
				tocOpenToken.nesting = -1; // -1 for opening tokens
				newTokens.push(tocOpenToken);

				const tocCloseToken = new state.Token("toc_close", "", 0);
				tocCloseToken.markup = "<!-- toc -->";
				tocCloseToken.block = true;
				tocCloseToken.nesting = 1; // 1 for closing tokens
				newTokens.push(tocCloseToken);
				continue;
			}
		}

		// Keep the token if it's not marked for removal
		if (!tokensToSkip.has(i) && token) {
			newTokens.push(token);
		}
	}

	state.tokens = newTokens;
	return true;
}
