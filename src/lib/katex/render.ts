// KaTeX SSR: Delimiterは $$ と $

import katex from "katex";
// const codeTagRegex = /(?<=<code[^>]*>)[^<>]*(?=<\/code[^>]*>)/g;

// const innerCodeTagTexts = (text: string): string[] => {
// 	const matchedTexts = text.match(codeTagRegex);
// 	if (!matchedTexts) {
// 		return [];
// 	}
// 	return matchedTexts;
// };

// const renderer = (text: string, regex: RegExp, displayMode: boolean): string => {
// 	const replaces = innerCodeTagTexts(text);

// 	const renderedText = text.replaceAll(regex, (subText: string) => {
// 		return katex.renderToString(subText.replaceAll("$", "").replaceAll(/(<br>|<\\br>|<br \/>|&nbsp;|amp;)/g, ""), { output: "html", displayMode: displayMode });
// 	});

// 	console.log(replaces);
// 	console.log(renderedText);

// 	replaces.forEach((token, idx) => {
// 		const renderedToken = renderedText.match(codeTagRegex)![idx];

// 		renderedText.replace(renderedToken, token);
// 	});

// 	return renderedText;
// };

const renderer = (text: string, regex: RegExp, displayMode: boolean): string => {
	const renderedText = text.replaceAll(regex, (subText: string) => {
		return katex.renderToString(
			subText
				.replaceAll("$", "")
				.replaceAll("\\[", "")
				.replaceAll("\\]", "")
				.replaceAll(/(<br>|<\\br>|<br \/>|&nbsp;|amp;)/g, ""),
			{ output: "html", displayMode: displayMode }
		);
	});

	console.log(renderedText);
	return renderedText;
};

export const mathRenderer = (text: string): string => {
	const inlineRegex = /(?<!<code[^>]*>)\$[^\$\\\[\]<>]*\$(?!<\/code[^>]*>)/g;
	const displayRegex = /(?<!<code[^>]*>)\\\[[^\$\\\[\]<>]*\\\](?!<\/code[^>]*>)/g;

	const renderedTextToDisplay = renderer(text, displayRegex, true);
	const renderedText = renderer(renderedTextToDisplay, inlineRegex, false);

	return renderedText;
};
