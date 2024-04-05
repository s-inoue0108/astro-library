<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { svgPaths, svgViewBoxes } from "../../../lib/svg/paths";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const transitionToTop = (): void => {
	window.scroll({
		top: 0,
		behavior: "smooth",
	});
};

// Progress circle
const radius = 42;

const progressPercent = ref<number>(0);

const circumference = 2 * Math.PI * radius;

const progress = computed<number>(() => {
	const val = 2 * Math.PI * (1 - progressPercent.value) * radius;
	if (progressPercent.value > 1) {
		return 0;
	}
	return val;
});

onMounted(() => {
	progressPercent.value = window.scrollY / document.getElementById("article-content")!.scrollHeight;

	const articleContent = document.querySelector(".article-content");
	const pageTopBtn = document.getElementById("page-top-btn");

	gsap.set(pageTopBtn, {
		autoAlpha: 0,
		xPercent: 100,
	});

	gsap.to(pageTopBtn, {
		autoAlpha: 1,
		xPercent: 0,
		duration: 0.2,
		scrollTrigger: {
			trigger: articleContent,
			toggleActions: "play reverse play reverse",
		},
	});

	const height = document.getElementById("article-content")!.scrollHeight;
	window.addEventListener("scroll", () => {
		const scrollAmount = window.scrollY;
		progressPercent.value = scrollAmount / height;
	});
});
</script>

<template>
	<button id="page-top-btn" type="button" @click="transitionToTop">
		<svg xmlns="http://www.w3.org/2000/svg" class="chevron" :viewBox="svgViewBoxes.chevronUp">
			<path :d="svgPaths.chevronUp"></path>
		</svg>
		<svg xmlns="http://www.w3.org/2000/svg" class="progress-bar" viewBox="0 0 100 100">
			<circle class="bar" cx="50" cy="50" :r="radius"></circle>
			<circle class="bg" cx="50" cy="50" :r="radius"></circle>
		</svg>
	</button>
</template>

<style scoped lang="scss">
#page-top-btn {
	width: 42px;
	height: 42px;
	border-radius: 9999px;
	z-index: 10;

	position: fixed;
	bottom: 8px;
	right: 8px;

	&:active {
		fill-opacity: 0.5;
		transition: 0.2s ease-in-out;
	}

	@include resp(lg) {
		top: calc(5rem + 21px);
		right: calc(25% + 8px + 21px);
	}

	.chevron {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 40%;
		height: 40%;
		fill: $rose;
		z-index: 11;
	}

	.progress-bar {
		width: 100%;
		height: 100%;
		transform: rotateZ(270deg);

		.bg {
			stroke: getColor(--bg-secondary-color);
			fill: getColor(--bg-inversion-color);
		}

		.bar {
			stroke-linecap: butt;
			stroke-width: 16px;
			stroke: $rose;
			stroke-dasharray: v-bind(circumference);
			stroke-dashoffset: v-bind(progress);
		}
	}
}
</style>
