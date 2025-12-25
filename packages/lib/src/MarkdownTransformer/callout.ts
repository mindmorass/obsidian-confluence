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

	// Track tokens that were skipped (empty after removing callout pattern)
	const skippedTokens = new Set<number>();
	// Track indices of callout tokens that were skipped, so we can skip following break tokens
	const skippedCalloutIndices = new Set<number>();

	// First pass: process tokens and mark which ones are skipped
	const firstPassTokens = state.tokens.reduce(
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

						// Remove the callout pattern and any trailing whitespace/newlines
						// Use a more aggressive replacement that removes the pattern and any following whitespace
						const patternMatch = check[0];
						const beforePattern = tokenToReturn.content.substring(
							0,
							tokenToReturn.content.indexOf(patternMatch),
						);
						const afterPattern = tokenToReturn.content.substring(
							tokenToReturn.content.indexOf(patternMatch) +
								patternMatch.length,
						);

						// Remove leading whitespace/newlines from afterPattern, but preserve the rest
						const cleanedAfter = afterPattern.replace(
							/^[\s\n\r]+/,
							"",
						);

						// Combine: beforePattern (should be empty for callouts) + cleanedAfter
						tokenToReturn.content = (
							beforePattern + cleanedAfter
						).trim();

						// Also check and remove from child tokens if they exist
						if (
							tokenToReturn.children &&
							tokenToReturn.children.length > 0
						) {
							let calloutPatternFoundInChild = false;
							let calloutPatternChildIndex = -1;

							tokenToReturn.children = tokenToReturn.children
								.map((child, childIndex) => {
									if (
										child &&
										child.content &&
										child.content.includes(check[0])
									) {
										calloutPatternFoundInChild = true;
										calloutPatternChildIndex = childIndex;

										const clonedChild = Object.assign(
											{},
											child,
										);
										const childBeforePattern =
											clonedChild.content.substring(
												0,
												clonedChild.content.indexOf(
													check[0],
												),
											);
										const childAfterPattern =
											clonedChild.content.substring(
												clonedChild.content.indexOf(
													check[0],
												) + check[0].length,
											);
										const childCleanedAfter =
											childAfterPattern.replace(
												/^[\s\n\r]+/,
												"",
											);
										clonedChild.content = (
											childBeforePattern +
											childCleanedAfter
										).trim();

										// If the child is now empty after removing the pattern, return null to filter it out
										if (
											!clonedChild.content ||
											clonedChild.content === ""
										) {
											return null;
										}

										return clonedChild;
									}
									return child;
								})
								.filter((child) => child !== null) as Token[];

							// After removing the callout pattern, remove any hardBreak/softBreak children
							// that appear immediately after the callout pattern child
							if (
								calloutPatternFoundInChild &&
								calloutPatternChildIndex >= 0
							) {
								// The callout pattern child may have been removed, so check the next child
								// after the position where it was
								tokenToReturn.children =
									tokenToReturn.children.filter(
										(child, childIndex) => {
											// If this is a hardBreak/softBreak and it's the first child
											// (which would be the case if the callout pattern child was removed),
											// or if it's right after where the callout pattern was, skip it
											if (
												(child.type === "hardbreak" ||
													child.type ===
														"softbreak") &&
												(childIndex === 0 ||
													childIndex ===
														calloutPatternChildIndex ||
													childIndex ===
														calloutPatternChildIndex +
															1)
											) {
												return false;
											}
											return true;
										},
									);
							} else {
								// If we didn't find the pattern in children, still check for leading hardBreaks
								// This handles the case where the pattern was in the token content itself
								tokenToReturn.children =
									tokenToReturn.children.filter(
										(child, childIndex) => {
											// Remove hardBreak/softBreak if it's the first child
											if (
												(child.type === "hardbreak" ||
													child.type ===
														"softbreak") &&
												childIndex === 0
											) {
												return false;
											}
											return true;
										},
									);
							}
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
							// Mark this token as skipped so we can also skip its paragraph
							skippedTokens.add(currentIndex);
							skippedCalloutIndices.add(currentIndex);
							return previousTokens;
						}
					}
					break;
				}
			}

			// Skip hardbreak/softbreak tokens that appear immediately after a skipped callout token
			// These create unwanted <br> tags in the rendered output
			if (
				(token.type === "hardbreak" || token.type === "softbreak") &&
				currentIndex > 0
			) {
				// Check if the previous token was a skipped callout
				const prevTokenIndex = currentIndex - 1;
				if (skippedCalloutIndices.has(prevTokenIndex)) {
					return previousTokens; // Skip this break token
				}
				// Also check a few tokens back in case there were paragraph tokens in between
				for (
					let i = currentIndex - 1;
					i >= Math.max(0, currentIndex - 5);
					i--
				) {
					if (skippedCalloutIndices.has(i)) {
						return previousTokens; // Skip this break token
					}
				}
			}

			return [...previousTokens, tokenToReturn];
		},
		[] as Token[],
	);

	// Second pass: remove empty paragraphs (paragraph_open/paragraph_close pairs)
	// that only contain skipped tokens, and merge consecutive paragraphs
	const skippedParagraphOpens = new Set<number>();
	const newTokens = firstPassTokens.reduce(
		(
			previousTokens: Token[],
			token: Token,
			currentIndex: number,
			firstPassTokensArray: Token[],
		) => {
			// Skip paragraph_open if the paragraph only contains skipped tokens
			if (token.type === "paragraph_open") {
				// Find the matching paragraph_close
				let paraCloseIndex = -1;
				let nestLevel = 1;
				for (
					let i = currentIndex + 1;
					i < firstPassTokensArray.length;
					i++
				) {
					const nextToken = firstPassTokensArray[i];
					if (!nextToken) break;
					if (nextToken.type === "paragraph_open") {
						nestLevel++;
					} else if (nextToken.type === "paragraph_close") {
						nestLevel--;
						if (nestLevel === 0) {
							paraCloseIndex = i;
							break;
						}
					}
				}
				// Check if the paragraph only contains skipped tokens or is empty
				if (paraCloseIndex >= 0) {
					let hasNonSkippedContent = false;
					for (let i = currentIndex + 1; i < paraCloseIndex; i++) {
						const tokenInPara = firstPassTokensArray[i];
						if (!tokenInPara) continue;
						// Skip paragraph_open/close and other structural tokens
						if (
							tokenInPara.type === "paragraph_open" ||
							tokenInPara.type === "paragraph_close"
						) {
							continue;
						}
						// Check if this token has content and wasn't skipped
						if (
							(tokenInPara.content &&
								tokenInPara.content.trim() !== "") ||
							(tokenInPara.children &&
								tokenInPara.children.length > 0)
						) {
							// Check if this token index wasn't in the original skipped set
							// We need to check against original indices, but we're working with firstPassTokens
							// For now, just check if the token has content
							hasNonSkippedContent = true;
							break;
						}
					}
					// If paragraph has no non-skipped content, skip both open and close
					if (!hasNonSkippedContent) {
						// Mark this paragraph_open as skipped
						skippedParagraphOpens.add(currentIndex);
						return previousTokens; // Skip paragraph_open
					}
				}
			}

			// If the previous paragraph_open was skipped, and this is a paragraph_open,
			// we might want to merge them, but for now just continue normally
			// The paragraph_close handling below will take care of skipping the matching close

			// Skip paragraph_close if its matching paragraph_open was skipped
			if (token.type === "paragraph_close") {
				// Find the matching paragraph_open
				let paraOpenIndex = -1;
				let nestLevel = 1;
				for (let i = currentIndex - 1; i >= 0; i--) {
					const prevToken = firstPassTokensArray[i];
					if (!prevToken) break;
					if (prevToken.type === "paragraph_close") {
						nestLevel++;
					} else if (prevToken.type === "paragraph_open") {
						nestLevel--;
						if (nestLevel === 0) {
							paraOpenIndex = i;
							break;
						}
					}
				}
				// Check if the paragraph_open was skipped
				if (
					paraOpenIndex >= 0 &&
					skippedParagraphOpens.has(paraOpenIndex)
				) {
					return previousTokens; // Skip paragraph_close
				}
				// Also check if the paragraph only contains skipped/empty content
				if (paraOpenIndex >= 0) {
					let hasNonSkippedContent = false;
					for (let i = paraOpenIndex + 1; i < currentIndex; i++) {
						const tokenInPara = firstPassTokensArray[i];
						if (!tokenInPara) continue;
						if (
							tokenInPara.type === "paragraph_open" ||
							tokenInPara.type === "paragraph_close"
						) {
							continue;
						}
						if (
							(tokenInPara.content &&
								tokenInPara.content.trim() !== "") ||
							(tokenInPara.children &&
								tokenInPara.children.length > 0)
						) {
							hasNonSkippedContent = true;
							break;
						}
					}
					// If paragraph has no content, skip the close too
					if (!hasNonSkippedContent) {
						return previousTokens; // Skip paragraph_close
					}
				}
			}

			return [...previousTokens, token];
		},
		[] as Token[],
	);

	state.tokens = newTokens;
	return true;
}
