import type MarkdownIt from "markdown-it";
import type StateCore from "markdown-it/lib/rules_core/state_core";
import type Token from "markdown-it/lib/token";

const panelRegex =
	/\[!(?<calloutType>.*?)\](?<collapseType>[+-])?[ \t]*(?<title>.*)/;

//panelType Options: "info", "note", "warning", "success", "error", "custom"
const panelTypeToAttributesMap: Record<string, [string, string][]> = {
	note: [["panelType", "note"]],
	abstract: [
		["panelType", "custom"],
		["panelIconId", "784a28f7-4aed-4be0-8d1c-5528271ddf8e"],
		["panelIcon", ":wow:"],
		["panelIconText", "😮"],
		["panelColor", "#FF8F73"],
	],
	info: [["panelType", "info"]],
	todo: [
		["panelType", "custom"],
		["panelIconId", "784a28f7-4aed-4be0-8d1c-5528271ddf8e"],
		["panelIcon", ":wow:"],
		["panelIconText", ":wow:"],
		["panelColor", "#FF8F73"],
	],
	tip: [
		["panelType", "custom"],
		["panelIconId", "784a28f7-4aed-4be0-8d1c-5528271ddf8e"],
		["panelIcon", ":wow:"],
		["panelIconText", ":wow:"],
		["panelColor", "#FF8F73"],
	],
	success: [["panelType", "success"]],
	question: [
		["panelType", "custom"],
		["panelIconId", "784a28f7-4aed-4be0-8d1c-5528271ddf8e"],
		["panelIcon", ":wow:"],
		["panelIconText", ":wow:"],
		["panelColor", "#FF8F73"],
	],
	warning: [["panelType", "warning"]],
	failure: [["panelType", "error"]],
	danger: [
		["panelType", "custom"],
		["panelIconId", "784a28f7-4aed-4be0-8d1c-5528271ddf8e"],
		["panelIcon", ":wow:"],
		["panelIconText", ":wow:"],
		["panelColor", "#FF8F73"],
	],
	bug: [
		["panelType", "custom"],
		["panelIconId", "784a28f7-4aed-4be0-8d1c-5528271ddf8e"],
		["panelIcon", ":wow:"],
		["panelIconText", ":wow:"],
		["panelColor", "#FF8F73"],
	],
	example: [
		["panelType", "custom"],
		["panelIconId", "784a28f7-4aed-4be0-8d1c-5528271ddf8e"],
		["panelIcon", ":wow:"],
		["panelIconText", ":wow:"],
		["panelColor", "#FF8F73"],
	],
	quote: [
		["panelType", "custom"],
		["panelIconId", "784a28f7-4aed-4be0-8d1c-5528271ddf8e"],
		["panelIcon", ":wow:"],
		["panelIconText", ":wow:"],
		["panelColor", "#FF8F73"],
	],
};

function getPanelAttributes(calloutType: string): [string, string][] {
	const calloutTypeCheck = calloutType.toLowerCase();
	const toReturn = panelTypeToAttributesMap[calloutTypeCheck];
	if (toReturn) {
		return toReturn;
	}

	// @ts-expect-error
	return panelTypeToAttributesMap["info"];
}

export default function calloutPlugin(md: MarkdownIt): void {
	md.core.ruler.push("panel", panel);
	md.core.ruler.push("expand", () => false);
}

export function panel(state: StateCore): boolean {
	// Track callout metadata for each blockquote_open token by its index
	const calloutMetadata = new Map<
		number,
		{
			adfType: string;
			calloutStartIndex: number;
			blockTitle: string;
		}
	>();

	const newTokens = state.tokens.reduce(
		(
			previousTokens: Token[],
			token: Token,
			currentIndex: number,
			allTokens: Token[],
		) => {
			let tokenToReturn = token;
			if (token.type === "blockquote_open") {
				let currentCheck = currentIndex + 1; // Start after this token
				// eslint-disable-next-line no-constant-condition
				while (true) {
					const tokenToCheck = allTokens[currentCheck];
					currentCheck = currentCheck + 1;
					if (!tokenToCheck) {
						continue;
					}
					if (tokenToCheck.type === "blockquote_close") {
						break;
					}
					if (tokenToCheck.content === "") {
						continue;
					}

					const check = tokenToCheck.content.match(panelRegex);

					if (
						check === null ||
						check === undefined ||
						check.groups === undefined
					) {
						continue;
					}

					const calloutType = check.groups["calloutType"] ?? "info";
					const collapseType = check.groups["collapseType"];
					const title = check.groups["title"];
					const calloutStartIndex = currentCheck - 1;
					const blockTitle = title ? title : calloutType;
					const adfType =
						collapseType === "+" || collapseType === "-"
							? "expand"
							: "panel";

					// Store metadata for this callout using the blockquote_open index
					calloutMetadata.set(currentIndex, {
						adfType,
						calloutStartIndex,
						blockTitle,
					});

					if (collapseType === "+" || collapseType === "-") {
						tokenToReturn = new state.Token("expand_open", "", 0);
						tokenToReturn.markup = ">";
						tokenToReturn.block = true;
						tokenToReturn.nesting = -1; // -1 for opening tokens
						tokenToReturn.attrs = [["title", blockTitle]];
					} else {
						tokenToReturn = new state.Token("panel_open", "", 0);
						tokenToReturn.markup = ">";
						tokenToReturn.block = true;
						tokenToReturn.nesting = -1; // -1 for opening tokens
						tokenToReturn.attrs = getPanelAttributes(calloutType);
					}

					break;
				}
			}

			// Find the matching blockquote_open for this close token
			if (token.type === "blockquote_close") {
				// Search backwards to find the matching open tag using nesting level
				// Use the nesting property to correctly match open/close pairs
				let nestLevel = 1;
				for (let i = currentIndex - 1; i >= 0; i--) {
					const tokenToCheck = allTokens[i];
					if (!tokenToCheck) {
						continue;
					}

					// Use nesting property: -1 for open, +1 for close, 0 for self-closing
					if (tokenToCheck.type === "blockquote_close") {
						nestLevel++;
					} else if (tokenToCheck.type === "blockquote_open") {
						nestLevel--;
						if (nestLevel === 0) {
							// Found the matching blockquote_open
							const metadata = calloutMetadata.get(i);
							if (metadata) {
								token.type = `${metadata.adfType}_close`;
								token.tag = "";
							}
							break;
						}
					}
				}
			}

			// Remove the callout pattern (e.g., [!INFO], [!WARNING]) from token content
			// The panel type is already set via token attributes, so we don't need
			// the callout label text in the rendered ADF, but we want to keep any other content
			for (const [, metadata] of calloutMetadata.entries()) {
				if (currentIndex === metadata.calloutStartIndex) {
					// This is the token with the callout pattern
					const check = token.content.match(panelRegex);
					if (check && check.length > 0) {
						// Clone the token to avoid mutating the original
						if (tokenToReturn === token) {
							tokenToReturn = Object.assign({}, token);
						}
						// Remove the callout pattern from the content, but keep everything else
						tokenToReturn.content = tokenToReturn.content
							.replace(check[0], "")
							.trim();

						// Also check and remove from child tokens if they exist
						if (
							tokenToReturn.children &&
							tokenToReturn.children.length > 0
						) {
							tokenToReturn.children = tokenToReturn.children.map(
								(child) => {
									if (
										child &&
										child.content &&
										child.content.includes(check[0])
									) {
										const clonedChild = Object.assign(
											{},
											child,
										);
										clonedChild.content =
											clonedChild.content
												.replace(check[0], "")
												.trim();
										return clonedChild;
									}
									return child;
								},
							);
						}

						// If the token has no content left after removing the pattern, skip it
						// But only if there are no children or children are also empty
						const hasContent =
							tokenToReturn.content &&
							tokenToReturn.content !== "";
						const hasChildren =
							tokenToReturn.children &&
							tokenToReturn.children.length > 0;
						if (!hasContent && !hasChildren) {
							return previousTokens;
						}
					}
					break;
				}
			}

			return [...previousTokens, tokenToReturn];
		},
		[] as Token[],
	);

	state.tokens = newTokens;
	return true;
}
