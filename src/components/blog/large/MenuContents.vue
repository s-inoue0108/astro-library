<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Category } from "../../../lib/newt/types";
import { svgPaths, svgViewBoxes } from "../../../lib/svg/paths";

// GSAP
import { gsap } from "gsap";

// Props
interface Props {
	categories?: Category[] | null;
}

const { categories } = defineProps<Props>();

// onMounted(() => {
// 	const menuBtn = document.getElementById("menu-btn");
// 	const links = document.querySelectorAll(".menu-link");
// 	const isOpen = ref<boolean>(false);

// 	gsap.set(links, {
// 		autoAlpha: 0,
// 	});

// 	const openMenu = gsap.timeline({ paused: true }).to(links, {
// 		autoAlpha: 1,
// 		ease: "power4.out",
// 		duration: 5,
// 		stagger: {
// 			each: 1,
// 		},
// 	});

// 	const closeMenu = gsap.timeline({ paused: true }).to(links, {
// 		autoAlpha: 0,
// 		ease: "power4.out",
// 		duration: 5,
// 		stagger: {
// 			each: 1,
// 		},
// 	});

// 	menuBtn!.addEventListener("click", async () => {
// 		if (isOpen.value) {
// 			await closeMenu.restart();
// 		} else {
// 			await openMenu.restart();
// 		}
// 		isOpen.value = !isOpen.value;
// 	});
// });
</script>

<template>
	<nav class="menu-contents">
		<ul class="menu-links">
			<li class="menu-link">
				<a href="/blog/all/1">
					<svg xmlns="http://www.w3.org/2000/svg" :viewBox="svgViewBoxes.caretRight">
						<path :d="svgPaths.caretRight"></path>
					</svg>
					ブログ
				</a>
			</li>
			<ul v-if="categories" class="category-links">
				<li v-for="category in categories" class="category-link">
					<a :href="`/blog/category/${category.slug}/1`">
						<svg xmlns="http://www.w3.org/2000/svg" :viewBox="category.svgViewBox">
							<path :d="category.svgIconPath"></path>
						</svg>
						{{ category.name }}
					</a>
				</li>
			</ul>
			<li class="menu-link">
				<a href="/profile">
					<svg xmlns="http://www.w3.org/2000/svg" :viewBox="svgViewBoxes.caretRight">
						<path :d="svgPaths.caretRight"></path>
					</svg>
					プロフィール
				</a>
			</li>
			<li class="menu-link">
				<a href="/privacy-policy">
					<svg xmlns="http://www.w3.org/2000/svg" :viewBox="svgViewBoxes.caretRight">
						<path :d="svgPaths.caretRight"></path>
					</svg>
					プライバシーポリシー
				</a>
			</li>
			<li class="menu-link">
				<a href="/contact">
					<svg xmlns="http://www.w3.org/2000/svg" :viewBox="svgViewBoxes.caretRight">
						<path :d="svgPaths.caretRight"></path>
					</svg>
					お問い合わせ
				</a>
			</li>
		</ul>
	</nav>
</template>

<style scoped lang="scss">
.menu-contents {
	background: getColor(--bg-primary-color);
	height: 100svh;
	padding: calc(150px + 1.5rem) 1.5rem;

	@include resp(lg) {
		padding: calc(230px + 1.5rem) 1.5rem;
	}

	.menu-links {
		display: flex;
		flex-direction: column;
		align-items: start;
		gap: 1.6rem;

		.menu-link {
			font-size: 1.5rem;
			font-weight: 600;
			letter-spacing: 1px;

			a {
				display: flex;
				align-items: center;
				gap: 1rem;
				height: 1.5rem;
				white-space: nowrap;

				svg {
					height: 100%;
					fill: getColor(--text-primary-color);
				}
			}
		}
	}

	.category-links {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		height: 8.3rem;
		overflow-y: auto;
		padding-left: 1rem;

		.category-link {
			font-size: 1rem;
			font-weight: 300;
			letter-spacing: 1px;

			a {
				display: flex;
				align-items: center;
				gap: 0.8rem;
				height: 1rem;
				white-space: nowrap;

				svg {
					width: 1rem;
					fill: getColor(--text-primary-color);
				}
			}
		}
	}
}
</style>
