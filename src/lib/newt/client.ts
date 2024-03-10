import { createClient } from "newt-client-js";
import type { Article, Category, Tag } from "../newt/types";

// Newt Client
const newtClient = createClient({
	spaceUid: import.meta.env.NEWT_SPACE_UID,
	token: import.meta.env.NEWT_CDN_API_TOKEN,
	apiType: "cdn",
});

// Get Articles
export const getArticles = async (limit: number = 1000, order: "asc" | "desc" = "desc", depth: 0 | 1 | 2 = 2, categoryId?: Category["_id"], tagIds?: Tag["_id"][]): Promise<Article[] | null> => {
	try {
		const { items: articles } = await newtClient.getContents<Article>({
			appUid: "blog",
			modelUid: "article",
			query: {
				order: [`${order === "desc" ? "-" : ""}_sys.raw.firstPublishedAt`],
				limit: limit,
				depth: depth,
				category: categoryId,
				tags: {
					in: tagIds,
				},
			},
		});
		return articles;
	} catch (err) {
		console.error(err);
		return null;
	}
};

// Get Blog Categories
export const getCategories = async (depth: 0 | 1 | 2 = 2): Promise<Category[] | null> => {
	try {
		const { items: categories } = await newtClient.getContents<Category>({
			appUid: "blog",
			modelUid: "category",
			query: {
				order: ["_sys.customOrder"],
				depth: depth,
			},
		});
		return categories;
	} catch (err) {
		console.error(err);
		return null;
	}
};

// Get Blog Tags
export const getTags = async (depth: 0 | 1 | 2 = 2): Promise<Tag[] | null> => {
	try {
		const { items: tags } = await newtClient.getContents<Tag>({
			appUid: "blog",
			modelUid: "tag",
			query: {
				order: ["_sys.customOrder"],
				depth: depth,
			},
		});
		return tags;
	} catch (err) {
		console.error(err);
		return null;
	}
};

// Get Category by Slug
export const getCategoryBySlug = async (slug: Category["slug"], depth: 0 | 1 | 2 = 2): Promise<Category | null> => {
	try {
		const category = await newtClient.getFirstContent<Category>({
			appUid: "blog",
			modelUid: "category",
			query: {
				slug: slug,
				depth: depth,
			},
		});
		return category;
	} catch (err) {
		console.error(err);
		return null;
	}
};

// Get Tags by Slugs
export const getTagsBySlugs = async (slugs: Tag["slug"][], depth: 0 | 1 | 2 = 2): Promise<Tag[] | null> => {
	try {
		const { items: tags } = await newtClient.getContents<Tag>({
			appUid: "blog",
			modelUid: "tag",
			query: {
				slug: {
					in: slugs,
				},
				order: ["_sys.customOrder"],
				depth: depth,
			},
		});
		return tags;
	} catch (err) {
		console.error(err);
		return null;
	}
};
