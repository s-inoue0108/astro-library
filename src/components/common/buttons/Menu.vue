<script setup lang="ts">
import { ref, computed } from "vue";
import { svgPaths, svgViewBoxes, type SvgMetadata } from "../../../lib/svg/paths";

// Props
interface Props {
	scale?: number;
}

const { scale } = withDefaults(defineProps<Props>(), {
	scale: 1,
});

const isOpen = ref<boolean>(false);
const state = computed<string>(() => {
	return isOpen.value ? "Close" : "Menu";
});

const svgMetadata = computed<SvgMetadata>(() => {
	return isOpen.value
		? {
				path: svgPaths.xmark,
				viewBox: svgViewBoxes.xmark,
		  }
		: {
				path: svgPaths.barsStaggered,
				viewBox: svgViewBoxes.barsStaggered,
		  };
});

const toggleOpen = async (): Promise<void> => {
	const menuContent = document.querySelector(".menu-content");
	if (!isOpen.value && menuContent!.classList.contains("is-open")) {
		isOpen.value = true;
	} else if (isOpen.value && !menuContent!.classList.contains("is-open")) {
		isOpen.value = false;
	}
};
</script>

<template>
	<button type="button" id="menu-btn" @click="toggleOpen">
		<svg xmlns="http://www.w3.org/2000/svg" :viewBox="svgMetadata.viewBox">
			<path :d="svgMetadata.path" />
		</svg>
		<label>{{ state.toUpperCase() }}</label>
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

	@include resp(lg) {
		&:hover {
			opacity: 0.5;
			transition: 0.3s ease;
		}
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
		fill: getColor(--bg-inversion-color);

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
