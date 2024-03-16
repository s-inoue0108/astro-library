import type { Article } from "./types";

export const getSideArticlesBySlug = async (articles: Article[] | null, slug: Article["slug"]): Promise<{ prev: Article | null; next: Article | null }> => {
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
