<script setup lang="ts">
import type { Article } from "../../../lib/newt/types";
import { svgPaths, svgViewBoxes } from "../../../lib/svg/paths";
import SvgButton from "../../common/buttons/Svg.vue";

interface Props {
	article: Pick<Article, "_id" | "_sys" | "slug">;
	secret: string;
	prev?: Pick<Article, "slug"> | null;
	next?: Pick<Article, "slug"> | null;
}

const { article, secret, prev, next } = defineProps<Props>();
const { _id, _sys, slug } = article;

const sliceText = (text: string, limit: number = 15): string => {
	return `${text.slice(0, limit)}...`;
};

const publishState = _sys.raw.publishedAt ? "#fb7185" : "#0ea5e9";
const cursor = _sys.raw.publishedAt ? "pointer" : "none";
const pointerEvents = _sys.raw.publishedAt ? "visible" : "none";
</script>

<template>
	<div class="preview-tab">
		<div class="current-preview">
			<SvgButton
				v-if="prev"
				:isLink="true"
				:linkUrl="`/blog/preview/${prev.slug}?secret=${secret}`"
				:isBlank="false"
				:fontWeight="500"
				:svgIconPath="svgPaths.chevronLeft"
				:svgViewBox="svgViewBoxes.chevronLeft"
			/>
			<a
				:href="`/blog/article/${slug}`"
				:tabindex="_sys.raw.publishedAt ? 1 : -1"
				target="_blank"
				rel="noopener noreferrer"
				class="slug"
			>
				{{ sliceText(slug) }}
			</a>
			<SvgButton
				v-if="next"
				:isLink="true"
				:linkUrl="`/blog/preview/${next.slug}?secret=${secret}`"
				:isBlank="false"
				:fontWeight="500"
				:svgIconPath="svgPaths.chevronRight"
				:svgViewBox="svgViewBoxes.chevronRight"
			/>
		</div>
		<ul class="buttons">
			<SvgButton
				title="Readme"
				:isLink="true"
				linkUrl="https://github.com/s-inoue0108/astro-library/blob/main/README.md"
				:isBlank="true"
				:fontWeight="500"
				:widthScale="3.6"
				:svgIconPath="svgPaths.readme"
				:svgViewBox="svgViewBoxes.readme"
			/>
			<SvgButton
				title="Edit"
				:isLink="true"
				:linkUrl="`https://app.newt.so/si-library/apps/blog/models/article/contents/${_id}`"
				:isBlank="true"
				:fontWeight="500"
				:widthScale="2.6"
				:svgIconPath="svgPaths.penNib"
				:svgViewBox="svgViewBoxes.penNib"
			/>
			<SvgButton
				title="Math"
				:isLink="false"
				:svgIconPath="svgPaths.subscript"
				:svgViewBox="svgViewBoxes.subscript"
				:fontWeight="500"
				:widthScale="2.6"
				btnId="katex-editor-open-btn"
			/>
		</ul>
	</div>
	<button type="button" id="preview-tab-close-btn">
		<svg xmlns="http://www.w3.org/2000/svg" :viewBox="svgViewBoxes.globe">
			<path :d="svgPaths.globe"></path>
		</svg>
	</button>
</template>

<style scoped lang="scss">
.preview-tab {
	color: getColor(--text-inversion-color);
	width: 100%;
	height: 100%;
	background: getColor(--bg-inversion-color, 0.8);
	padding: 0.5rem;

	display: flex;
	flex-direction: column;
	gap: 1rem;

	@include resp(lg) {
		padding: 0 2rem;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.current-preview {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;

		a {
			fill: getColor(--bg-primary-color);
		}

		@include resp(lg) {
			gap: 1rem;
		}

		.slug {
			font-family: "Source Code Pro", Consolas, monospace;
			color: v-bind(publishState);
			background: getColor(--bg-primary-color);
			border-radius: 12px;
			padding: 0.3rem 1rem;
			font-size: 1.2rem;
			pointer-events: v-bind(pointerEvents);
			cursor: v-bind(cursor);

			&:active {
				opacity: 0.5;
				transition: 0.2s all;
			}

			@include resp(lg) {
				font-size: 2rem;
				padding: 0.5rem 1rem;
				letter-spacing: 0.7px;

				&:hover {
					opacity: 0.5;
					transition: 0.2s all;
				}
			}
		}
	}

	.buttons {
		display: flex;
		justify-content: center;
		gap: 1rem;

		fill: getColor(--text-inversion-color);

		@include resp(lg) {
			align-items: center;
			gap: 1.5rem;
		}
	}
}

#preview-tab-close-btn {
	width: 50px;
	height: 50px;
	background: getColor(--bg-inversion-color, 0.8);
	position: absolute;
	right: 0;
	bottom: 100px;
	border-top-left-radius: 12px;

	&:active {
		opacity: 0.5;
		transition: 0.2s all;
	}

	@include resp(lg) {
		width: 100px;
		height: 100px;

		&:hover {
			opacity: 0.5;
			transition: 0.2s all;
		}
	}

	svg {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 70%;
		height: auto;
		fill: v-bind(publishState);
	}
}

#katex-editor-open-btn {
	display: none;

	@include resp(lg) {
		display: block;
	}
}
</style>
