<script setup lang="ts">
interface Props {
	svgIconPath?: string;
	svgViewBox?: string;
	svgFillColor?: string;
	isLink?: boolean;
	linkUrl?: string;
	currentPath?: string;
	testPathRegex?: RegExp;
	title?: string;
	widthScale?: number;
	heightScale?: number;
	fontScale?: number;
	fontWeight?: number;
	radius?: string;
	isBlank?: boolean;
	btnId?: string;
}

const {
	svgIconPath,
	svgViewBox,
	isLink,
	linkUrl,
	currentPath,
	testPathRegex,
	title,
	widthScale,
	heightScale,
	fontScale,
	fontWeight,
	radius,
	isBlank,
	btnId,
} = withDefaults(defineProps<Props>(), {
	svgViewBox: "0 0 512 512",
	isLink: false,
	widthScale: 1,
	heightScale: 1,
	fontScale: 1.2,
	fontWeight: 300,
	radius: "9999px",
	isBlank: false,
	btnId: "",
});

const isCurrent = (currentPath?: string, testPathRegex?: RegExp): boolean => {
	if (!currentPath || !testPathRegex) {
		return false;
	}
	return testPathRegex.test(currentPath);
};

const linkTarget = isBlank
	? { target: "_blank", rel: "noopener noreferrer" }
	: { target: "", rel: "" };
</script>

<template>
	<a :href="linkUrl" :target="linkTarget.target" :rel="linkTarget.rel" v-if="isLink">
		<div
			class="ring"
			:class="[isCurrent(currentPath, testPathRegex) ? 'bgborder bold' : 'bgtransparent']"
		>
			<svg xmlns="http://www.w3.org/2000/svg" :viewBox="svgViewBox" v-if="svgIconPath">
				<path :d="svgIconPath" />
			</svg>
			<label v-if="title">
				{{ title }}
			</label>
		</div>
	</a>
	<button type="button" :id="btnId" v-else>
		<div class="ring">
			<svg xmlns="http://www.w3.org/2000/svg" :viewBox="svgViewBox" v-if="svgIconPath">
				<path :d="svgIconPath" />
			</svg>
			<label v-if="title">
				{{ title }}
			</label>
		</div>
	</button>
</template>

<style scoped lang="scss">
a,
button {
	font-weight: v-bind(fontWeight);
	width: max-content;
	height: max-content;

	&:active {
		opacity: 0.5;
		transition: 0.2s ease;
	}

	@include resp(lg) {
		&:hover {
			opacity: 0.5;
			transition: 0.2s ease;
		}
	}

	.ring {
		position: relative;
		border: solid 2px getColor(--border-color);
		border-radius: v-bind(radius);
		width: calc(36px * v-bind(widthScale));
		height: calc(36px * v-bind(heightScale));
		box-shadow: 0 0 3px getColor(--border-color);

		@include resp(sm) {
			width: calc(48px * v-bind(widthScale));
			height: calc(48px * v-bind(heightScale));
			box-shadow: 0 0 5px getColor(--border-color);
		}

		@include resp(lg) {
			width: calc(64px * v-bind(widthScale));
			height: calc(64px * v-bind(heightScale));
			box-shadow: 0 0 7px getColor(--border-color);
		}

		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;

		svg {
			width: auto;
			max-width: 60%;
			height: 60%;
			fill: v-bind(svgFillColor);
		}

		label {
			font-size: calc(1rem * v-bind(fontScale));
			white-space: nowrap;
			cursor: pointer;

			@include resp(sm) {
				font-size: calc(1.4rem * v-bind(fontScale));
			}

			@include resp(lg) {
				font-size: calc(1.8rem * v-bind(fontScale));
			}
		}
	}
}

.bold {
	font-weight: 700;
}

.bgborder {
	background: getColor(--border-color, 0.7);
}

.bgtransparent {
	background: transparent;
}
</style>
