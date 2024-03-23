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
	if (menuContent!.classList.contains("is-open")) {
		isOpen.value = true;
	} else {
		isOpen.value = false;
	}
};
</script>

<template>
	<button type="button" @click="toggleOpen" id="menu-btn">
		<svg xmlns="http://www.w3.org/2000/svg" :viewBox="svgMetadata.viewBox">
			<path :d="svgMetadata.path" />
		</svg>
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
	padding: 2rem;

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
		padding: 12px;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		fill: getColor(--bg-primary-color);
	}
}
</style>
