import type { Article } from "../newt/types";
import Fuse from "fuse.js";

// Generate word segments with related article slugs
export interface Segment {
	word: string;
	relateSlug: Article["slug"];
}

export const getSegments = async (articles: Article[]): Promise<Segment[]> => {
	const segmenter = new Intl.Segmenter("ja", { granularity: "word" });
	const segments: Segment[] = [];

	articles.forEach((article) => {
		const words = segmenter.segment(article.description ?? "");

		for (const data of words) {
			if (data.isWordLike && data.segment.length > 1) {
				segments.push({ word: data.segment, relateSlug: article.slug });
			}
		}
	});

	// uniqueな配列
	const uniqueSegments = Array.from(new Map(segments.map((seg) => [JSON.stringify(seg), seg])).values());

	return uniqueSegments;
};

// FuseJS Client
export const fuseClient = async (segments: Segment[], threshold: number = 0.3, minMatchCharLength: number = 2): Promise<Fuse<Segment>> => {
	return new Fuse(segments, { keys: ["word"], threshold: threshold, minMatchCharLength: minMatchCharLength });
};
