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
		$(elm).text("");
	});

	try {
		// Rendering DISPLAY KaTeX
		const renderedDisplayText = $.html().replaceAll(/\$\$[^\$]*\$\$/g, (text: string) => {
			return katex.renderToString(
				text.replaceAll("$", "").replaceAll(/(<br>|<\\br>|<br \/>|&nbsp;|amp;)/g, ""),
				{ output: "html", displayMode: true }
			);
		});

		// Rendering INLINE KaTeX
		const renderedText = renderedDisplayText.replaceAll(/\$[^\$]*\$/g, (text: string) => {
			return katex.renderToString(
				text.replaceAll("$", "").replaceAll(/(<br>|<\\br>|<br \/>|&nbsp;|amp;)/g, ""),
				{ output: "html", displayMode: false }
			);
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
			.before(
				`<div class="code-title"><label class="title">${
					fileName ?? ""
				}</label><button type="button" id="copy-btn-${idx}" class="copy-btn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="${
					svgViewBoxes.copy
				}"><path d="${svgPaths.copy}" /></svg></button></div>`
			);

		$(elm).html(result.value);
	});
};

// styling <a>
export const anchorStylist = async ($: CheerioAPI): Promise<void> => {
	$("a").each((_, elm) => {
		if (!$(elm).attr("href") || !/^#fn/.test($(elm).attr("href")!)) {
			$(elm).attr("target", "_blank").attr("rel", "noopener noreferrer");
			$(elm).append(
				`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${svgViewBoxes.arrowUpRightFromSquare}"><path d="${svgPaths.arrowUpRightFromSquare}"></path></svg>`
			);
		}
	});
};

// styling <img />
export const imgStylist = async ($: CheerioAPI): Promise<void> => {
	$("img").each((_, elm) => {
		$(elm).unwrap().wrap('<figure class="figure-img"></figure>');
		if ($(elm).attr("title") && $(elm).attr("title") !== "") {
			$(elm).after(
				`<figcaption><svg xmlns="http://www.w3.org/2000/svg" viewBox="${
					svgViewBoxes.image
				}"><path d="${svgPaths.image}"></path></svg><span>${$(elm).attr(
					"title"
				)}</span></figcaption>`
			);
		}
	});
};

// styling <table>
export const tableStylist = async ($: CheerioAPI): Promise<void> => {
	$("table").each((_, elm) => {
		$(elm).wrap('<figure class="figure-table"></figure>');
	});
};

// Callout
const calloutStyles: { slug: string; svgPath: string; svgViewBox: string }[] = [
	{ slug: "info", svgPath: svgPaths.circleInfo, svgViewBox: svgViewBoxes.circleInfo },
	{
		slug: "warning",
		svgPath: svgPaths.circleExclamation,
		svgViewBox: svgViewBoxes.circleExclamation,
	},
	{ slug: "hint", svgPath: svgPaths.lightbulb, svgViewBox: svgViewBoxes.lightbulb },
];

// styling <blockquote>
export const calloutStylist = async ($: CheerioAPI): Promise<void> => {
	$("blockquote").each((_, elm) => {
		const p = $(elm).find("p");
		const style = p.children("strong").first();
		if (!p || !style) return;

		calloutStyles.forEach((s) => {
			if (style.text() === s.slug) {
				p.children("br").first().remove();
				style.remove();
				p.before(
					`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${s.svgViewBox}"><path d="${s.svgPath}"></path></svg>`
				);
				$(elm).addClass(`blockquote-${s.slug}`);
			}
		});
	});
};

// styling footnotes
export const footnotesAdjuster = async ($: CheerioAPI): Promise<void> => {
	if ($(".footnotes-sep") && $(".footnotes")) {
		$(".footnotes-sep").remove();
		$(".footnotes").before("<h1>脚注</h1>");
	}
};

export interface Heading {
	text: string;
	lev: string;
	h1id?: number;
	offsets?: number[];
}

// get headings
export const getHeadings = async ($: CheerioAPI): Promise<Heading[]> => {
	const headings: Heading[] = [];
	let h1id = 0;

	$("h1,h2,h3").each((idx, elm) => {
		const text = $(elm).text();
		const lev = $(elm).toString().match(/h\d/)![0];

		$(elm).attr("id", `number-${idx}-${text}`);
		$(elm).addClass(`content-${lev}`);

		if (lev === "h1") {
			h1id += 1;
			headings.push({ text, lev, h1id });
		} else {
			headings.push({ text, lev });
		}
	});

	return headings;
};

export const getDiffOffsets = async ($: CheerioAPI): Promise<number[]> => {
	const headingOffsets: number[] = [];
	$("h1,h2,h3").each((_, elm) => {
		const id = $(elm).attr("id");
		const idName = $(elm).text();

		if (id && id === idName) {
			headingOffsets.push(document.getElementById(idName)!.offsetTop);
		}
	});

	return [...headingOffsets, document.documentElement.scrollHeight];
};

export const offsetsMapper = async (headings: Heading[], offsets: number[]): Promise<Heading[]> => {
	const headingsWithOffsets: Heading[] = [];
	headings.forEach((h, idx) => {
		headingsWithOffsets.push({
			text: h.text,
			lev: h.lev,
			h1id: h.h1id,
			offsets: [offsets[idx], offsets[idx + 1]],
		});
	});

	return headingsWithOffsets;
};
