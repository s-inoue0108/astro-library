<script setup lang="ts">
import { onMounted, ref } from "vue";
import Modal from "../../common/modal/ToggleableModal.vue";
import { svgPaths, svgViewBoxes } from "../../../lib/svg/paths";
import { load } from "cheerio";
import { getDiffOffsets, offsetsMapper, type Heading } from "../../../lib/cheerio/func";

interface Props {
	headings: Heading[];
}

const { headings } = defineProps<Props>();
const headingsData = ref<Heading[]>(headings);

onMounted(async () => {
	const $ = load(document.getElementById("article-content")!.innerHTML);

	let offsets = await getDiffOffsets($);
	let headingsWithOffsets = await offsetsMapper(headings, offsets);
	headingsData.value = headingsWithOffsets;

	let windowWidth = window.innerWidth;
	window.addEventListener("resize", async () => {
		if (windowWidth !== window.innerWidth) {
			windowWidth = window.innerWidth;
			offsets = await getDiffOffsets($);
			headingsWithOffsets = await offsetsMapper(headings, offsets);
			headingsData.value = headingsWithOffsets;
		}
	});

	window.addEventListener("scroll", async () => {
		try {
			const scroll = window.scrollY;
			headingsData.value.forEach((h) => {
				const anchor = document.getElementById(`toc-${h.lev}-${h.text}`);
				if (h.offsets![0] < scroll && scroll <= h.offsets![1]) {
					anchor!.classList.add("highlight");
				} else {
					anchor!.classList.remove("highlight");
				}
			});
		} catch {
			return;
		}
	});
});
</script>

<template>
	<Modal title="Contents" :svgIconPath="svgPaths.listUl" :svgViewBox="svgViewBoxes.listUl">
		<ul class="headings">
			<li class="heading" v-for="(h, idx) in headingsData" :key="idx">
				<a :id="`toc-${h.lev}-${h.text}`" :href="`#${h.text}`" class="toc-h1" v-if="h.lev === 'h1'">
					<span class="before" v-if="h.text !== '脚注'">{{ h.h1id }}</span>
					<span class="before" v-else>
						<svg xmlns="http://www.w3.org/2000/svg" :viewBox="svgViewBoxes.lightbulb">
							<path :d="svgPaths.lightbulb" />
						</svg>
					</span>
					{{ h.text }}
				</a>
				<a
					:id="`toc-${h.lev}-${h.text}`"
					:href="`#number-${idx}-${h.text}`"
					class="toc-h2"
					v-else-if="h.lev === 'h2'"
				>
					<span class="before" />
					{{ h.text }}
				</a>
				<a
					:id="`toc-${h.lev}-${h.text}`"
					:href="`#number-${idx}-${h.text}`"
					class="toc-h-else"
					v-else
				>
					{{ h.text }}
				</a>
			</li>
			<li class="heading">
				<a id="toc-h1-rel-articles" href="#関連記事" class="toc-h1">
					<span class="before">
						<svg xmlns="http://www.w3.org/2000/svg" :viewBox="svgViewBoxes.penNib">
							<path :d="svgPaths.penNib"></path>
						</svg>
					</span>
					関連記事
				</a>
			</li>
		</ul>
	</Modal>
</template>

<style scoped lang="scss">
.headings {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	max-height: 256px;
	overflow-y: auto;

	@include resp(lg) {
		max-height: 60vh;
	}

	.heading {
		.toc-h1 {
			max-width: 100%;
			font-size: 1.2rem;
			font-weight: 600;
			display: inline-flex;
			align-items: start;
			gap: 0.5rem;

			.before {
				background: getColor(--bg-inversion-color);
				display: inline-block;
				width: 1.4rem;
				height: 1.4rem;
				color: getColor(--text-inversion-color);
				font-size: 1rem;
				border-radius: 9999px;
				text-align: center;
				padding: 0.15rem;
				position: relative;

				svg {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					width: 60%;
					height: 60%;
					fill: getColor(--text-inversion-color);
				}
			}
		}

		.toc-h2 {
			max-width: 100%;
			margin-left: 1.4rem;
			font-weight: 400;

			.before {
				background: getColor(--bg-inversion-color);
				display: inline-block;
				width: 0.5rem;
				height: 0.5rem;
				border-radius: 9999px;
				vertical-align: middle;
				margin-right: 0.5rem;
			}
		}

		.toc-h-else {
			max-width: 100%;
			margin-left: 2.4rem;
			font-size: 0.8rem;
		}

		a {
			&:active {
				text-decoration: underline;
				transition: 0.2s ease;
			}

			@include resp(lg) {
				&:hover {
					text-decoration: underline;
					transition: 0.2s ease;
				}
			}
		}
	}
}

.headings::-webkit-scrollbar {
	background: getColor(--bg-secondary-color);
}

.headings::-webkit-scrollbar-thumb {
	background: getColor(--border-color);
	border-radius: 9999px;
}

.highlight {
	background: tropicGradient(90deg);
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}
</style>
