import { createClient } from "newt-client-js";
import type { Article, Category, Tag } from "../newt/types";

// Newt Client
const newtClient = createClient({
	spaceUid: import.meta.env.NEWT_SPACE_UID,
	token: import.meta.env.NEWT_CDN_API_TOKEN,
	apiType: "cdn",
});

// Get Articles
export const getArticles = async (limit: number = 10, order: "asc" | "desc" = "desc", skip: number = 0, depth: number = 2, category?: Category, tags?: Tag[]): Promise<Article[]> => {
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

// Get Blog Categories
export const getCategories = async (depth: number = 2): Promise<Category[]> => {
	const { items: categories } = await newtClient.getContents<Category>({
		appUid: "blog",
		modelUid: "category",
		query: {
			depth: depth,
		},
	});
	return categories;
};

// Get Blog Tags
export const getTags = async (depth: number = 2): Promise<Tag[]> => {
	const { items: tags } = await newtClient.getContents<Tag>({
		appUid: "blog",
		modelUid: "tag",
		query: {
			depth: depth,
		},
	});
	return tags;
};
