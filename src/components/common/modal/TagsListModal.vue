<script setup lang="ts">
import { ref } from "vue";
import Modal from "./NormalModal.vue";
import TagCard from "../../blog/card/TagCard.vue";
import { svgPaths, svgViewBoxes } from "../../../lib/svg/paths";
import { getTags } from "../../../lib/newt/client";
// import NoContent from "../../blog/background/NoContent.astro";

const tags = await getTags();
</script>

<template>
	<Modal title="タグ" :svgIconPath="svgPaths.tags" :svgViewBox="svgViewBoxes.tags">
		<template #info>
			<div class="tags-length">
				{{ tags ? tags.length : 0 }} 件
			</div>
		</template>
		<template #content>
			<ul class="tags">
				<li v-for="tag in tags" class="tag">
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
	align-items: center;
	gap: 0.3rem;
}

.tags-length {
	color: getColor(--text-secondary-color);
	white-space: nowrap;
}
</style>
