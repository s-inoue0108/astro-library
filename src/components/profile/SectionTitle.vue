<script setup lang="ts">
import { svgPaths, svgViewBoxes } from "../../lib/svg/paths";

interface Props {
	title: string;
	prevHref?: string;
	nextHref?: string;
}

const { title, prevHref, nextHref } = defineProps<Props>();
</script>

<template>
	<div class="section-title">
		<a :href="prevHref" class="prev-btn" v-if="prevHref">
			<svg xmlns="http://www.w3.org/2000/svg" :viewBox="svgViewBoxes.chevronUp">
				<path :d="svgPaths.chevronUp"></path>
			</svg>
		</a>
		<h1 :id="title">{{ title }}</h1>
		<a :href="nextHref" class="next-btn" v-if="nextHref">
			<svg xmlns="http://www.w3.org/2000/svg" :viewBox="svgViewBoxes.chevronDown">
				<path :d="svgPaths.chevronDown"></path>
			</svg>
		</a>
	</div>
</template>

<style scoped lang="scss">
.section-title {
	background: getColor(--bg-secondary-color);
	position: sticky;
	top: 36px;
	width: calc(100% + 2rem);
	padding: 0.5rem 0;
	// margin: 2rem 0 2rem -1rem;
	margin-left: -1rem;
	z-index: 100;

	@include resp(sm) {
		// margin: 4rem 0 4rem -1rem;
		top: 48px;
	}

	@include resp(lg) {
		// margin: 8rem 0 8rem -1rem;
		top: 64px;
	}

	h1 {
		font-size: 1.8rem;
		font-weight: 600;
		letter-spacing: 2px;
		text-align: center;

		@include resp(sm) {
			font-size: 2.4rem;
			letter-spacing: 4px;
		}

		@include resp(lg) {
			font-size: 3.6rem;
			letter-spacing: 6px;
		}
	}

	.prev-btn,
	.next-btn {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 1.8rem;
		height: 1.8rem;

		@include resp(sm) {
			width: 2.4rem;
			height: 2.4rem;
		}

		@include resp(lg) {
			width: 3.6rem;
			height: 3.6rem;
		}

		svg {
			fill: getColor(--text-secondary-color);
		}
	}

	.prev-btn {
		left: 0.9rem;
	}

	.next-btn {
		right: 0.9rem;
	}
}
</style>
