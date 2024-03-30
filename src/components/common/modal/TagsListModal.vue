<script setup lang="ts">
import { computed, ref } from "vue";
import Modal from "./NormalModal.vue";
import TagCard from "../../blog/card/TagCard.vue";
import { svgPaths, svgViewBoxes } from "../../../lib/svg/paths";
import type { Category, Tag } from "../../../lib/newt/types";

interface Props {
	categories: Category[] | null;
	tags: Tag[] | null;
}

const { categories, tags } = defineProps<Props>();

const selectedCategory = ref<Category["name"] | "すべて">("すべて");

const getCategoryByName = (name: Category["name"]): Category | null => {
	if (!categories) {
		return null;
	}
	const category = categories.filter((category) => category.name === name)[0];
	return category;
};

const bgColor = computed<Category["themeColor"] | "">(() => {
	const category = getCategoryByName(selectedCategory.value);

	if (!category) {
		return "";
	}

	return category.themeColor;
});

const svg = computed<{ path: Category["svgIconPath"]; viewBox: Category["svgViewBox"] }>(() => {
	const category = getCategoryByName(selectedCategory.value);

	if (!category) {
		return { path: svgPaths.tags, viewBox: svgViewBoxes.tags };
	}

	return { path: category.svgIconPath, viewBox: category.svgViewBox };
});

const viewTags = computed<Tag[]>(() => {
	if (!tags) {
		return [];
	} else if (selectedCategory.value === "すべて") {
		return tags;
	}
	const filteredTags = tags.filter((tag) => {
		return tag.parentCategory.name === selectedCategory.value;
	});
	return filteredTags;
});
</script>

<template>
	<Modal title="Tags" :svgIconPath="svgPaths.tags" :svgViewBox="svgViewBoxes.tags">
		<template #info>
			<div class="category-selector">
				<label for="select-category">
					<svg xmlns="http://www.w3.org/2000/svg" :viewBox="svg.viewBox">
						<path :d="svg.path"></path>
					</svg>
				</label>
				<select v-model="selectedCategory" id="select-category" name="select-category">
					<option>すべて</option>
					<option
						v-for="category in categories!.map((category: Category) => category.name)"
						:key="category"
					>
						{{ category }}
					</option>
				</select>
			</div>
		</template>
		<template #content>
			<ul class="tags">
				<li v-for="tag in viewTags" class="tag">
					<TagCard :tag="tag" />
				</li>
			</ul>
		</template>
	</Modal>
</template>

<style scoped lang="scss">
.tags {
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
}

.category-selector {
	width: max-content;
	font-size: 0.8rem;
	font-weight: 500;
	border-radius: 9999px;
	background: getColor(--bg-primary-color);
	padding: 0.2rem 0.5rem;
	margin-right: 5rem;
	position: relative;
	display: flex;
	align-items: center;
	gap: 0.5rem;
	color: getColor(--text-secondary-color);
	fill: getColor(--text-secondary-color);

	label {
		height: 100%;

		svg {
			display: flex;
			align-items: center;
			width: auto;
			height: 0.8rem;
			fill: v-bind(bgColor);
		}
	}

	select {
		background: getColor(--bg-primary-color);
		color: v-bind(bgColor);
		text-align-last: center;

		option {
			background: getColor(--bg-secondary-color);
			color: getColor(--text-primary-color);
		}
	}
}
</style>
