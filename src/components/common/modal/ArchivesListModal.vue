<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Article } from '../../../lib/newt/types';

import Modal from "./NormalModal.vue";
import ArchiveCard from "../../blog/card/ArchiveCard.vue";
import { svgPaths, svgViewBoxes } from "../../../lib/svg/paths";
// import NoContent from "../../blog/background/NoContent.astro";

interface Props {
	articles?: Article[] | null;
}

const { articles } = defineProps<Props>()

const getExistYearsList = (): number[] => {
	if (!articles) {
		return [new Date().getFullYear()];
	}

	const years = articles.map((article) => {
		return new Date(article._sys.raw.firstPublishedAt).getFullYear()
	});

	const uniqueYears = Array.from(new Set(years)).sort((a, b) => b - a);
	return uniqueYears;
}

const getExistMonthsList = (year: number): number[] => {
	if (!articles) {
		return [];
	}

	const months = articles.filter((article) => {
		return new Date(article._sys.raw.firstPublishedAt).getFullYear() === year
	}).map((article) => {
		return new Date(article._sys.raw.firstPublishedAt).getMonth() + 1
	});

	const uniqueMonths = Array.from(new Set(months)).sort((a, b) => b - a);
	return uniqueMonths;
}

const selectedYear = ref<string>(`${new Date().getFullYear()}`);

const existYears = getExistYearsList();

// generate months and existence list
const existMonthsAndExistence = computed<{ month: number, exist: boolean }[]>(() => {
	const returnArr = [];
	const existMonths = getExistMonthsList(+selectedYear.value);

	for (let m = 1; m <= 12; m++) {
		returnArr.push({ month: m, exist: existMonths.includes(m) });
	}
	return returnArr;
})
</script>

<template>
	<Modal title="アーカイブ" :svgIconPath="svgPaths.boxArchive" :svgViewBox="svgViewBoxes.boxArchive">
		<template #info>
			<div class="year-selector">
				<svg xmlns="http://www.w3.org/2000/svg" :viewBox="svgViewBoxes.calendarCheck">
					<path :d="svgPaths.calendarCheck"></path>
				</svg>
				<select v-model="selectedYear">
					<option v-for="year in existYears" :key="year">{{ year }}</option>
				</select>
			</div>
		</template>
		<template #content>
			<ul class="archives">
				<li v-for="elm in existMonthsAndExistence" :key="elm.month" class="card">
					<ArchiveCard :year="+selectedYear" :month="elm.month" :is-disabled="!elm.exist" />
				</li>
			</ul>
		</template>
	</Modal>
</template>

<style scoped lang="scss">
.archives {
	display: grid;
	grid-template-rows: 4rem 4rem 4rem 4rem;
	grid-template-columns: 1fr 1fr 1fr;
}

.year-selector {
	color: getColor(--text-secondary-color);
	font-size: 1rem;
	font-weight: 500;
	border-radius: 9999px;
	background: getColor(--bg-primary-color);
	padding: 0.2rem 0.5rem;
	position: relative;
	display: flex;
	align-items: baseline;
	gap: 0.5rem;

	svg {
		width: auto;
		height: 0.9rem;
		fill: getColor(--text-secondary-color);
	}

	select {
		background: getColor(--bg-secondary-color);
		color: getColor(--text-secondary-color);
	}
}
</style>
