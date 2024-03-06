import { createClient } from "newt-client-js";

// Newt Client
export const newtClient = createClient({
	spaceUid: import.meta.env.NEWT_SPACE_UID,
	token: import.meta.env.NEWT_CDN_API_TOKEN,
	apiType: "cdn",
});

// Get Articles
export const getArticles = async (limit: number = 10, order: "asc" | "desc" = "desc", skip: number = 0, depth: number = 2): Promise<Article[]> => {
	const { items: articles } = await newtClient.getContents<Article>({
		appUid: "blog",
		modelUid: "article",
		query: {
			order: [`${order === "desc" ? "-" : ""}_sys.raw.publishedAt`],
			limit: limit,
			skip: skip,
			depth: depth,
		},
	});
	return articles;
};
