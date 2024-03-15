// KaTeX SSR: Delimiterは $$ と $

import katex from "katex";

const rendering = (text: string, regex: RegExp, displayMode: boolean): string => {
	const renderedText = text.replaceAll(regex, (substr: string) => {
		return katex.renderToString(substr.replaceAll("$", "").replaceAll(/(<br>|<\\br>|<br \/>|&nbsp;|amp;)/g, ""), { output: "html", displayMode: displayMode });
	});
	return renderedText;
};

export const mathRenderer = (text: string): string => {
	const inlineRegex = /\$[^\$]*\$/g;
	const displayRegex = /\$\$[^\$]*\$\$/g;

	const renderedTextToDisplay = rendering(text, displayRegex, true);
	const renderedText = rendering(renderedTextToDisplay, inlineRegex, false);

	return renderedText;
};
