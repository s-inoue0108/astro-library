import { load } from "cheerio";
import type { CheerioAPI } from "cheerio";
import katex from "katex";
import hljs from "highlight.js";
import { svgPaths, svgViewBoxes } from "../svg/paths";

// rendering KaTeX
export const mathRenderer = async (rawText: string): Promise<string> => {
	// initialize Cheerio
	let $ = load(rawText);

	// Extract <code> text
	const rawTextsInnerCodeTag: string[] = [];
	$("code").each((_, elm) => {
		rawTextsInnerCodeTag.push($(elm).text());
	});

	try {
		// Rendering DISPLAY KaTeX
		const renderedDisplayText = rawText.replaceAll(/\$\$[^\$]*\$\$/g, (text: string) => {
			return katex.renderToString(text.replaceAll("$", "").replaceAll(/(<br>|<\\br>|<br \/>|&nbsp;|amp;)/g, ""), { output: "html", displayMode: true });
		});

		// Rendering INLINE KaTeX
		const renderedText = renderedDisplayText.replaceAll(/\$[^\$]*\$/g, (text: string) => {
			return katex.renderToString(text.replaceAll("$", "").replaceAll(/(<br>|<\\br>|<br \/>|&nbsp;|amp;)/g, ""), { output: "html", displayMode: false });
		});

		// reinitialized Cheerio API
		$ = load(renderedText);

		// replace <code> text
		$("code").each((idx, elm) => {
			$(elm).text(rawTextsInnerCodeTag[idx]);
		});

		return $.html();
	} catch {
		return "";
	}
};

// Syntax Highlight
export const syntaxHighlighter = async ($: CheerioAPI): Promise<void> => {
	$("pre code").each((idx, elm) => {
		const className = $(elm).attr("class");
		const classList = className ? className.split(":") : [];
		const language = classList[0]?.replace("language-", "");
		const fileName = classList[1];

		let result;

		const code = $(elm).text();

		if (language) {
			try {
				result = hljs.highlight(code, { language });
			} catch {
				result = hljs.highlightAuto(code);
			}
		} else {
			result = hljs.highlightAuto(code);
		}

		$(elm)
			.parent()
			.before(`<div class="code-title"><label class="title">${fileName ?? ""}</label><button type="button" id="copy-btn-${idx}" class="copy-btn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="${svgViewBoxes.copy}"><path d="${svgPaths.copy}" /></svg></button></div>`);

		$(elm).html(result.value);
	});
};

// styling <a>
export const anchorStylist = async ($: CheerioAPI): Promise<void> => {
	$("a").each((_, elm) => {
		if (!$(elm).attr("href") || !/^#fn/.test($(elm).attr("href")!)) {
			$(elm).attr("target", "_blank").attr("rel", "noopener noreferrer");
			$(elm).append(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${svgViewBoxes.arrowUpRightFromSquare}"><path d="${svgPaths.arrowUpRightFromSquare}"></path></svg>`);
		}
	});
};

// styling footnotes
export const footnotesAdjuster = async ($: CheerioAPI): Promise<void> => {
	if ($(".footnotes-sep") && $(".footnotes")) {
		$(".footnotes-sep").remove();
		$(".footnotes").before("<h1>脚注</h1>");
	}
};

// get headings
export const getHeadings = async ($: CheerioAPI): Promise<{ text: string; lev: string; h1id?: number }[]> => {
	const headings: { text: string; lev: string; h1id?: number }[] = [];
	let h1id = 0;

	$("h1,h2,h3").each((_, elm) => {
		const text = $(elm).text();
		const lev = $(elm).toString().match(/h\d/)![0];
		$(elm).attr("id", text);

		if (lev === "h1") {
			h1id += 1;
			headings.push({ text, lev, h1id });
		} else {
			headings.push({ text, lev });
		}
	});

	return headings;
};
