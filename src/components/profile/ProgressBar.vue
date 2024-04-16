<script setup lang="ts">
import { computed, ref } from "vue";
import type { Skill } from "../../lib/newt/types";

interface Props {
	skill: Skill;
}

const { skill } = defineProps<Props>();
const { name, color, level, icon } = skill;

// Progress circle
const radius = 84;

const circumference = 2 * Math.PI * radius;

const progress = computed<number>(() => {
	const val = 2 * Math.PI * (1 - level / 100) * radius;
	if (level > 100) {
		return 0;
	}
	return val;
});

const isViewingImage = ref<boolean>(true);
const toggleView = (): void => {
	isViewingImage.value = !isViewingImage.value;
};
</script>

<template>
	<div :id="`skill-${name}`">
		<button type="button" @click="toggleView" class="progress-circle">
			<Transition name="switch">
				<img :src="icon.src" :alt="name" class="icon" v-if="isViewingImage" />
				<p v-else class="level">{{ level }}</p>
			</Transition>
			<svg xmlns="http://www.w3.org/2000/svg" class="progress-bar" viewBox="0 0 200 200">
				<circle class="bar" cx="100" cy="100" :r="radius"></circle>
				<circle class="bg" cx="100" cy="100" :r="radius"></circle>
			</svg>
		</button>
		<p class="title">{{ name }}</p>
	</div>
</template>

<style scoped lang="scss">
.progress-circle {
	position: relative;
	border-radius: 9999px;
	width: 84px;
	height: 84px;
	box-shadow: 0 0 5px getColor(--shadow-color);

	&:active {
		opacity: 0.5;
		transition: 0.3s ease;
	}

	@include resp(lg) {
		width: 168px;
		height: 168px;

		&:hover {
			opacity: 0.5;
			transition: 0.3s ease;
		}
	}

	.icon {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 40%;
		height: 40%;
		object-fit: contain;
		z-index: 10;
	}

	.level {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 1.8rem;
		font-weight: 600;
		z-index: 10;

		@include resp(lg) {
			font-size: 3.2rem;
		}
	}

	.progress-bar {
		width: 100%;
		height: 100%;
		transform: rotateZ(270deg);

		.bg {
			stroke-width: 4px;
			stroke: getColor(--bg-secondary-color);
			fill: getColor(--bg-secondary-color);
		}

		.bar {
			stroke-linecap: butt;
			stroke-width: 24px;
			stroke: v-bind(color);
			stroke-dasharray: v-bind(circumference);
			stroke-dashoffset: v-bind(progress);

			@include resp(lg) {
				stroke-width: 32px;
			}
		}
	}
}

.title {
	width: 84px;
	margin-top: 0.5rem;
	font-weight: 500;
	text-align: center;
	letter-spacing: 0.5px;
	font-size: 0.8rem;

	@include resp(lg) {
		width: 168px;
		margin-top: 1.5rem;
		font-size: 1.6rem;
	}
}

.switch-enter-from,
.switch-leave-to {
	opacity: 0;
}

.switch-enter-active,
.switch-leave-active {
	transition: 0.2s ease-in-out;
}

.switch-enter-to,
.switch-leave-from {
	opacity: 1;
}
</style>
