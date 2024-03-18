<script setup lang="ts">
import type { Article } from "../../../lib/newt/types";
import { svgPaths, svgViewBoxes } from "../../../lib/svg/paths";
import SvgButton from "../../common/buttons/Svg.vue";

interface Props {
	article: Pick<Article, "_id" | "slug">;
}

const { article } = defineProps<Props>();
const { _id, slug } = article;
</script>

<template>
	<div class="preview-tab">
		<div class="current-preview">
			<h1>Current Preview :</h1>
			<a :href="`/blog/article/${slug}`" target="_blank" rel="noopener noreferrer" class="slug">
				{{ slug }}
			</a>
		</div>
		<ul class="buttons">
			<SvgButton
				title="Edit"
				:isLink="true"
				:linkUrl="`https://app.newt.so/si-library/apps/blog/models/article/contents/${_id}`"
				:isBlank="true"
				:fontWeight="500"
				:widthScale="3"
				:svgIconPath="svgPaths.penNib"
				:svgViewBox="svgViewBoxes.penNib"
			/>
			<SvgButton
				title="KaTeX"
				:isLink="false"
				:svgIconPath="svgPaths.subscript"
				:svgViewBox="svgViewBoxes.subscript"
				:fontWeight="500"
				:widthScale="3"
				btnId="katex-editor-open-btn"
			/>
		</ul>
	</div>
	<button type="button" id="preview-tab-close-btn">
		<svg xmlns="http://www.w3.org/2000/svg" :viewBox="svgViewBoxes.arrowsUpDown">
			<path :d="svgPaths.arrowsUpDown"></path>
		</svg>
	</button>
</template>

<style scoped lang="scss">
.preview-tab {
	color: getColor(--text-inversion-color);
	width: 100%;
	height: 100%;
	background: getColor(--bg-inversion-color, 0.8);
	padding: 0 2rem;

	display: flex;
	align-items: center;
	justify-content: space-between;

	.current-preview {
		display: flex;
		align-items: center;
		gap: 1rem;

		h1 {
			font-size: 2.5rem;
			font-weight: 700;
			letter-spacing: 1px;
		}

		.slug {
			font-family: Consolas, monospace;
			color: $rose;
			background: getColor(--bg-secondary-color);
			border-radius: 12px;
			padding: 0.5rem 1rem;
			font-size: 2rem;
			letter-spacing: 0.7px;
		}
	}

	.buttons {
		display: flex;
		align-items: center;
		gap: 1.5rem;

		fill: getColor(--text-inversion-color);
	}
}

#preview-tab-close-btn {
	width: 80px;
	background: getColor(--bg-inversion-color, 0.8);
	position: absolute;
	right: 0;
	bottom: 100px;
	border-top-left-radius: 12px;

	&:active {
		background: $rose;
		transition: 0.2s ease;
	}

	svg {
		margin: 1rem;
		transform: translateX(-15px);
		width: 100%;
		height: 40px;
		fill: getColor(--text-inversion-color);
	}
}
</style>
