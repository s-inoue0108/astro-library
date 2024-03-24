import type { Article, RawArticle } from "./types";

export const getSideArticlesBySlug = async (
	articles: Article[] | RawArticle[] | null,
	slug: Article["slug"]
): Promise<{ prev: Article | RawArticle | null; next: Article | RawArticle | null }> => {
	if (!articles) {
		return {
			prev: null,
			next: null,
		};
	}

	const slugs = articles.map((article) => article.slug);
	const notedArticleIdx = slugs.indexOf(slug);

	const prevArticle = articles[notedArticleIdx - 1];
	const nextArticle = articles[notedArticleIdx + 1];

	return {
		prev: prevArticle,
		next: nextArticle,
	};
};
