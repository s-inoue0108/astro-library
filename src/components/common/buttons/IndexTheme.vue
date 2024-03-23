<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { svgPaths, svgViewBoxes, type SvgMetadata } from "../../../lib/svg/paths";

// Props
interface Props {
	scale?: number;
}

const { scale } = withDefaults(defineProps<Props>(), {
	scale: 1,
});

type Theme = "light" | "dark";

const theme = ref<Theme | null>(null);

const svgMetadata = computed<SvgMetadata>(() => {
	return theme.value === "dark"
		? {
				path: svgPaths.moon,
				viewBox: svgViewBoxes.moon,
		  }
		: {
				path: svgPaths.sun,
				viewBox: svgViewBoxes.sun,
		  };
});

const switchClass = async (theme: Theme): Promise<void> => {
	if (theme === "dark") {
		document.documentElement.classList.remove("light");
		document.documentElement.classList.add("dark");
	} else {
		document.documentElement.classList.remove("dark");
		document.documentElement.classList.add("light");
	}
};

const toggleTheme = async (): Promise<void> => {
	if (theme.value === "dark") {
		theme.value = "light";
	} else {
		theme.value = "dark";
	}
	await switchClass(theme.value);
	localStorage.setItem("theme", theme.value);
};

// initialization theme
onMounted(() => {
	if (
		(typeof localStorage.getItem("theme") === "string" &&
			localStorage.getItem("theme") === "dark") ||
		(typeof window.localStorage.getItem("theme") !== "string" &&
			window.matchMedia("(prefers-color-scheme: dark)").matches)
	) {
		theme.value = "dark";
	} else {
		theme.value = "light";
	}
});
</script>

<template>
	<button type="button" @click="toggleTheme">
		<svg xmlns="http://www.w3.org/2000/svg" :viewBox="svgMetadata.viewBox">
			<path :d="svgMetadata.path" />
		</svg>
		<label>{{ theme ? theme.toUpperCase() : "" }}</label>
	</button>
</template>

<style scoped lang="scss">
button {
	width: calc(20px * v-bind(scale));
	height: calc(20px * v-bind(scale));
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;

	&:active {
		opacity: 0.5;
		transition: 0.3s ease;
	}

	@include resp(sm) {
		width: calc(30px * v-bind(scale));
		height: calc(30px * v-bind(scale));
	}

	@include resp(lg) {
		width: calc(40px * v-bind(scale));
		height: calc(40px * v-bind(scale));
	}

	svg {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		fill: getColor(--theme-color);

		@include resp(lg) {
			width: 60%;
			height: 60%;
		}
	}

	label {
		cursor: pointer;
		display: none;
		font-size: calc(0.8rem * v-bind(scale));
		white-space: nowrap;
		position: absolute;
		bottom: -4px;
		left: 50%;
		transform: translateX(-50%);
		color: getColor(--text-primary-color);

		@include resp(lg) {
			display: block;
		}
	}
}
</style>
