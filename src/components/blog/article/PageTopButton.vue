<script setup lang="ts">
import { onMounted } from "vue";
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

onMounted(() => {
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
});
</script>

<template>
	<button id="page-top-btn" type="button" @click="transitionToTop">
		<svg xmlns="http://www.w3.org/2000/svg" :viewBox="svgViewBoxes.chevronUp">
			<path :d="svgPaths.chevronUp"></path>
		</svg>
	</button>
</template>

<style scoped lang="scss">
#page-top-btn {
	width: 42px;
	height: 42px;
	background: getColor(--bg-primary-color);
	border-radius: 9999px;
	border: solid 2px getColor(--border-color);
	box-shadow: 0 0 5px getColor(--border-color);
	z-index: 1000;

	position: fixed;
	bottom: 8px;
	right: 8px;

	svg {
		width: 100%;
		height: 100%;
		padding: 8px;
		fill: getColor(--text-secondary-color);
	}
}
</style>
