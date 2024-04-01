<script setup lang="ts" generic="T">
import type { Page } from "astro";
import SvgButton from "../../common/buttons/Svg.vue";
import { svgPaths, svgViewBoxes } from "../../../lib/svg/paths";

interface Props {
	page: Page<T>;
}

const { page } = defineProps<Props>();
const { currentPage, lastPage, url } = page;
</script>

<template>
	<template v-if="lastPage > 1">
		<ul class="buttons">
			<li class="start">
				<SvgButton
					:svg-icon-path="svgPaths.anglesLeft"
					:svg-view-box="svgViewBoxes.anglesLeft"
					:is-link="true"
					:link-url="url.current.replace(/\/\d{1,}$/, '/1')"
				/>
			</li>
			<!--minus 2-->
			<li v-if="currentPage - 2 > 0">
				<SvgButton
					:title="`${currentPage - 2}`"
					:is-link="true"
					:link-url="url.current.replace(/\/\d{1,}$/, `/${currentPage - 2}`)"
					:width-scale="0.8"
					:height-scale="0.8"
				/>
			</li>
			<!--minus 1-->
			<li v-if="currentPage - 1 > 0">
				<SvgButton
					:title="`${currentPage - 1}`"
					:is-link="true"
					:link-url="url.prev"
					:width-scale="0.8"
					:height-scale="0.8"
				/>
			</li>
			<!--current-->
			<li>
				<SvgButton
					:title="`${currentPage}`"
					:is-link="true"
					:link-url="url.current"
					:current-path="url.current"
					:test-path-regex="new RegExp(`\^${url.current}\$`)"
					:width-scale="0.8"
					:height-scale="0.8"
				/>
			</li>
			<!--plus 1-->
			<li v-if="currentPage + 1 <= lastPage">
				<SvgButton
					:title="`${currentPage + 1}`"
					:is-link="true"
					:link-url="url.next"
					:width-scale="0.8"
					:height-scale="0.8"
				/>
			</li>
			<!--plus 2-->
			<li v-if="currentPage + 2 <= lastPage">
				<SvgButton
					:title="`${currentPage + 2}`"
					:is-link="true"
					:link-url="url.current.replace(/\/\d{1,}$/, `/${currentPage + 2}`)"
					:width-scale="0.8"
					:height-scale="0.8"
				/>
			</li>
			<li class="end">
				<SvgButton
					:svg-icon-path="svgPaths.anglesRight"
					:svg-view-box="svgViewBoxes.anglesRight"
					:is-link="true"
					:link-url="url.current.replace(/\/\d{1,}$/, `/${lastPage}`)"
				/>
			</li>
		</ul>
	</template>
</template>

<style scoped lang="scss">
.buttons {
	width: 100%;
	margin: 1rem 0;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 0.5rem;

	@include resp(sm) {
		gap: 0.7rem;
	}

	@include resp(lg) {
		gap: 1rem;
	}

	.start,
	.end {
		fill: getColor(--text-primary-color);
	}
}
</style>
