<script setup lang="ts">
interface Props {
	title: string;
	svgIconPath?: string;
	svgViewBox?: string;
}

const { title, svgIconPath, svgViewBox } = defineProps<Props>();
</script>

<template>
	<div class="modal">
		<div class="modal-info">
			<div class="title-section">
				<svg xmlns="http://www.w3.org/2000/svg" :viewBox="svgViewBox" v-if="svgIconPath">
					<path :d="svgIconPath" />
				</svg>
				<h1 class="title">
					{{ title }}
				</h1>
			</div>
			<div class="info">
				<slot name="info" />
			</div>
		</div>
		<div class="border" />
		<slot name="content" />
	</div>
</template>

<style scoped lang="scss">
.modal {
	border-radius: 4px;
	background: getColor(--bg-secondary-color);
	padding: 0.5rem;
	margin: 1.5rem 0;
	box-shadow: 3px 3px 3px getColor(--shadow-color);

	.modal-info {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.title-section {
			width: calc(100% - 1.2rem);
			display: flex;
			align-items: center;
			gap: 0.5rem;

			svg {
				height: 1.2rem;
				fill: getColor(--text-primary-color);
			}

			.title {
				font-size: 1.2rem;
				font-weight: 700;
				white-space: nowrap;
			}
		}

		.info {
			height: 100%;
		}
	}

	.border {
		border: dashed 1px getColor(--border-color);
		border-radius: 2px;
		margin: 0.5rem 0;
	}
}
</style>
