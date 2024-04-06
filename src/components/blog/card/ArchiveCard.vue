<script setup lang="ts">
interface Props {
	year: number;
	month: number;
	isDisabled: boolean;
}

const { month, isDisabled } = defineProps<Props>();

const cursor = isDisabled ? "none" : "pointer";
const pointerEvents = isDisabled ? "none" : "visible";
const opacity = isDisabled ? 0.5 : 1;
</script>

<template>
	<a :href="`/blog/archive/${year}-${month}/1`" class="archive-month-card">
		<label class="month">
			{{ month }}
		</label>
	</a>
</template>

<style scoped lang="scss">
.archive-month-card {
	font-size: 2.4rem;
	font-weight: 500;
	position: relative;
	display: block;
	width: 100%;
	height: 100%;
	color: getColor(--text-primary-color);
	background: getColor(--bg-primary-color);
	border: solid 1px getColor(--bg-secondary-color);
	pointer-events: v-bind(pointerEvents);
	opacity: v-bind(opacity);

	&:active {
		font-size: 3rem;
		font-weight: 600;
		transition: 0.2s ease;
	}

	@include resp(lg) {
		&:hover {
			font-size: 3rem;
			font-weight: 600;
			transition: 0.2s ease;
		}
	}

	.month {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		letter-spacing: 1px;
		cursor: v-bind(cursor);
	}
}
</style>
