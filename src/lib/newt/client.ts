import { createClient } from "newt-client-js";
import type { Article, Category, RawArticle, Tag, DevLink, DocumentFile } from "../newt/types";

// Newt Client
const newtClient = createClient({
	spaceUid: import.meta.env.NEWT_SPACE_UID,
	token: import.meta.env.NEWT_CDN_API_TOKEN,
	apiType: "cdn",
});

// Preview Client
const newtPreviewClient = createClient({
	spaceUid: import.meta.env.NEWT_SPACE_UID,
	token: import.meta.env.NEWT_ARTICLE_PREVIEW_SECRET,
	apiType: "api",
});

// Get Articles
export const getArticles = async (
	limit: number = 1000,
	order: "asc" | "desc" = "desc",
	depth: 0 | 1 | 2 = 2,
	categoryId?: Category["_id"],
	tagIds?: Tag["_id"][]
): Promise<Article[] | null> => {
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
		throw err;
	}
};

// Get Raw Articles
export const getRawArticles = async (
	limit: number = 1000,
	order: "asc" | "desc" = "desc",
	depth: 0 | 1 | 2 = 2,
	categoryId?: Category["_id"],
	tagIds?: Tag["_id"][]
): Promise<RawArticle[] | null> => {
	try {
		const { items: articles } = await newtPreviewClient.getContents<RawArticle>({
			appUid: "blog",
			modelUid: "article",
			query: {
				order: [`${order === "desc" ? "-" : ""}_sys.raw.createdAt`],
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
		throw err;
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
		throw err;
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
		throw err;
	}
};

// Get Dev Links
export const getDevLinks = async (depth: 0 | 1 | 2 = 2): Promise<DevLink[] | null> => {
	try {
		const { items: links } = await newtClient.getContents<DevLink>({
			appUid: "blog",
			modelUid: "link",
			query: {
				order: ["_sys.customOrder"],
				depth: depth,
			},
		});
		return links;
	} catch (err) {
		throw err;
	}
};

// Get Document Files
export const getDocFiles = async (depth: 0 | 1 | 2 = 2): Promise<DocumentFile[] | null> => {
	try {
		const { items: docs } = await newtClient.getContents<DocumentFile>({
			appUid: "blog",
			modelUid: "docmnt",
			query: {
				order: ["_sys.customOrder"],
				depth: depth,
			},
		});
		return docs;
	} catch (err) {
		throw err;
	}
};

// Get Category by Slug
export const getCategoryBySlug = async (
	slug: Category["slug"],
	depth: 0 | 1 | 2 = 2
): Promise<Category | null> => {
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
		throw err;
	}
};

// Get Tags by Slugs
export const getTagsBySlugs = async (
	slugs: Tag["slug"][],
	depth: 0 | 1 | 2 = 2
): Promise<Tag[] | null> => {
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
		throw err;
	}
};

// Get Preview Article by Slug
export const getPreviewBySlug = async (
	slug?: Article["slug"],
	depth: 0 | 1 | 2 = 2
): Promise<RawArticle | Article | null> => {
	try {
		const article = await newtPreviewClient.getFirstContent<RawArticle | Article>({
			appUid: "blog",
			modelUid: "article",
			query: {
				slug: slug,
				depth: depth,
			},
		});
		return article;
	} catch (err) {
		throw err;
	}
};
