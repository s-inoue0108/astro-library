import { getArticles, getPreviewBySlug } from "../../../lib/newt/client";
import { getOgImageResponse } from "../../../components/blog/article/OgImage";
import type { APIContext } from "astro";

export const getStaticPaths = async () => {
	const articles = await getArticles();

	if (!articles || articles.length <= 0) return;

	return articles.map((article) => ({
		params: { slug: article.slug },
	}));
};

export const GET = async ({ params }: APIContext) => {
	const secret = import.meta.env.NEWT_ARTICLE_PREVIEW_SECRET;
	const article = await getPreviewBySlug(secret, params.slug);

	if (!secret || !article) return;

	const ogImageResponse = await getOgImageResponse(article.title, article.tags);

	return ogImageResponse;
};
