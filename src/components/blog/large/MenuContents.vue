<script setup lang="ts">
import { svgPaths, svgViewBoxes } from "../../../lib/svg/paths";
</script>

<template>
	<section class="menu-contents">
		<ul class="menu-links">
			<li class="menu-link">
				<a href="/profile">
					<svg xmlns="http://www.w3.org/2000/svg" :viewBox="svgViewBoxes.caretRight">
						<path :d="svgPaths.caretRight"></path>
					</svg>
					Profile
				</a>
			</li>
			<li class="menu-link">
				<a href="/contact">
					<svg xmlns="http://www.w3.org/2000/svg" :viewBox="svgViewBoxes.caretRight">
						<path :d="svgPaths.caretRight"></path>
					</svg>
					Contact
				</a>
			</li>
			<li class="menu-link">
				<a href="/blog/all/1">
					<svg xmlns="http://www.w3.org/2000/svg" :viewBox="svgViewBoxes.caretRight">
						<path :d="svgPaths.caretRight"></path>
					</svg>
					Blog
				</a>
			</li>
		</ul>
	</section>
</template>

<style scoped lang="scss">
.menu-contents {
	background: getColor(--bg-primary-color);
	height: 100svh;
	padding: calc(150px + 1rem) 1rem;

	@include resp(lg) {
		padding: calc(230px + 1rem) 1rem;
	}

	.menu-links {
		display: flex;
		flex-direction: column;
		align-items: start;
		gap: 0.8rem;

		.menu-link {
			font-size: 1.3rem;
			font-weight: 500;
			letter-spacing: 0.7px;

			a {
				display: flex;
				align-items: center;
				gap: 0.5rem;
				height: 1.3rem;
				white-space: nowrap;
				letter-spacing: 0.5px;

				svg {
					height: 100%;
					fill: getColor(--text-primary-color);
				}
			}
		}
	}
}
</style>
