import satori from "satori";
import { html } from "satori-html";
import { Resvg } from "@resvg/resvg-js";
import NotoSansJP from "../../../fonts/NotoSansJP-Bold.ttf";
import { getArticles, getPreviewBySlug } from "../../../lib/newt/client";
import type { ReactNode } from "react";

export const getStaticPaths = async () => {
	const articles = await getArticles();

	if (!articles || articles.length <= 0) return;

	return articles.map((article) => ({
		params: { slug: article.slug },
		props: { article: article },
	}));
};

const height = 630;
const width = 1200;

export const GET = async ({ params }: { params: { slug: string } }) => {
	const { slug } = params;
	const secret = import.meta.env.NEWT_ARTICLE_PREVIEW_SECRET;
	const article = await getPreviewBySlug(secret, slug);

	if (!secret || !article) return;

	const outputHTML = html(`<div tw="flex w-full flex-col bg-red-400">
		<div tw="h-93 mx-6 px-4 flex flex-col bg-white">
			<h1 tw="text-4xl">${article.title}</h1>
			<p tw="text-[1.8rem] w-[56rem] bottom-0">${article.description}</p>
		</div>
		<div tw="flex flex-row mx-6 bg-white rounded-b-2xl mb-8">
			<p tw="text-[1.5rem] text-zinc-600">${import.meta.env.APP_NAME}</p>
		</div>
	</div>`);

	const svg = await satori(outputHTML as ReactNode, {
		fonts: [
			{
				name: "NotoSansJP",
				data: Buffer.from(NotoSansJP, "utf-8"),
				weight: 600,
				style: "normal",
			},
		],
		height,
		width,
	});

	const resvg = new Resvg(svg, {
		font: {
			loadSystemFonts: false,
		},
		fitTo: {
			mode: "width",
			value: width,
		},
	});

	const ogpImage = resvg.render();

	return {
		headers: {
			"Content-Type": "image/png",
			"Cache-Control": "public, max-age=31536000, immutable",
		},

		body: ogpImage.asPng(),
	};
};
