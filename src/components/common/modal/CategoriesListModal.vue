<script setup lang="ts">
import { ref, watchEffect } from "vue";
import Modal from "./NormalModal.vue";
import { svgPaths, svgViewBoxes } from "../../../lib/svg/paths";
import type { Article, Category, Tag } from "../../../lib/newt/types";

interface Props {
	articles?: Article[] | null;
	categories?: Category[] | null;
	tags?: Tag[] | null;
}

const selectedTerm = ref<"デフォルト" | "タグ数順" | "記事数順">("デフォルト");

const { categories, articles, tags } = defineProps<Props>();

const refCategories = ref<Category[] | null | undefined>(categories);

const getNumberOfArticles = (categorySlug: Category["slug"]): number => {
	if (!articles) return 0;
	const filteredArticles = articles.filter((article) => {
		return article.category.slug === categorySlug;
	});
	return filteredArticles.length;
};

const getNumberOfTags = (categorySlug: Category["slug"]): number => {
	if (!tags) return 0;
	const filteredTags = tags.filter((tag) => {
		return tag.parentCategory.slug === categorySlug;
	});
	return filteredTags.length;
};

watchEffect(() => {
	if (!refCategories.value) return;
	if (selectedTerm.value === "タグ数順") {
		refCategories.value.sort((a, b) => {
			const numberOfArticlesCurrentA = getNumberOfTags(a.slug);
			const numberOfArticlesCurrentB = getNumberOfTags(b.slug);
			return numberOfArticlesCurrentB - numberOfArticlesCurrentA;
		});
	} else if (selectedTerm.value === "記事数順") {
		refCategories.value.sort((a, b) => {
			const numberOfArticlesA = getNumberOfArticles(a.slug);
			const numberOfArticlesB = getNumberOfArticles(b.slug);
			return numberOfArticlesB - numberOfArticlesA;
		});
	} else {
		refCategories.value.sort((a, b) => {
			return a._sys.customOrder - b._sys.customOrder;
		});
	}
});
</script>

<template>
	<Modal
		title="Categories"
		:svgIconPath="svgPaths.layerGroup"
		:svgViewBox="svgViewBoxes.layerGroup"
	>
		<template #info>
			<div class="term-selector">
				<label for="select-term">
					<svg xmlns="http://www.w3.org/2000/svg" :viewBox="svgViewBoxes.shuffle">
						<path :d="svgPaths.shuffle"></path>
					</svg>
				</label>
				<select v-model="selectedTerm" id="select-term" name="select-term">
					<option>デフォルト</option>
					<option>タグ数順</option>
					<option>記事数順</option>
				</select>
			</div>
		</template>
		<template #content>
			<ul class="categories">
				<li v-for="category in refCategories" :key="category._id" class="category">
					<a :href="`/blog/category/${category.slug}/1`">
						<div class="name">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								:viewBox="category.svgViewBox"
								:fill="category.themeColor"
							>
								<path :d="category.svgIconPath"></path>
							</svg>
							<span>{{ category.name }}</span>
						</div>
						<div class="stats">
							<span v-if="selectedTerm === '記事数順'">
								{{ getNumberOfArticles(category.slug) }} 記事
							</span>
							<span v-else-if="selectedTerm === 'タグ数順'">
								{{ getNumberOfTags(category.slug) }} タグ
							</span>
						</div>
					</a>
					<hr />
				</li>
			</ul>
		</template>
	</Modal>
</template>

<style scoped lang="scss">
.categories {
	display: flex;
	flex-direction: column;
	align-items: start;
	gap: 1rem;

	.category {
		width: 100%;
		height: 2rem;

		a {
			padding: 0 0.5rem;
			display: flex;
			justify-content: space-between;
			width: 100%;
			height: 100%;

			@include resp(lg) {
				&:hover {
					opacity: 0.5;
					transition: 0.2s all;
				}
			}

			.name {
				display: inline-flex;
				align-items: center;
				gap: 1rem;
				color: getColor(--text-primary-color);
				font-weight: 500;
				letter-spacing: 1px;
				white-space: nowrap;

				svg {
					width: 1.2rem;
					max-height: 1.2rem;
					height: auto;
				}
			}

			.stats {
				display: inline-flex;
				align-items: center;
				gap: 1rem;
				color: getColor(--text-secondary-color);
			}
		}
	}
}

.term-selector {
	width: max-content;
	font-size: 0.9rem;
	font-weight: 500;
	border-radius: 9999px;
	background: getColor(--bg-primary-color);
	padding: 0.2rem 0.5rem;
	margin-right: 6rem;
	position: relative;
	display: flex;

	align-items: center;
	gap: 0.5rem;

	label {
		height: 100%;

		svg {
			display: flex;
			align-items: center;
			width: auto;
			height: 0.9rem;
			fill: getColor(--text-secondary-color);
		}
	}

	select {
		cursor: pointer;
		padding-left: 0.5rem;
		background: getColor(--bg-primary-color);
		color: getColor(--text-secondary-color);
		text-align-last: center;

		option {
			background: getColor(--bg-secondary-color);
			color: getColor(--text-primary-color);
		}
	}
}

hr {
	border-color: getColor(--border-color);
}
</style>
