<script setup lang="ts">
import type { Qualification } from "../../lib/newt/types";

interface Props {
	qualification: Qualification;
}

const { qualification } = defineProps<Props>();
const { name, date, credential } = qualification;

const getUrl = (credential: Qualification["credential"]): string => {
	if (!credential) return "";
	if (typeof credential.data === "string") {
		return credential.data;
	}
	return credential.data.src;
};

const url = getUrl(credential);
</script>

<template>
	<div class="qualification">
		<a :href="url" target="_blank" rel="noopener noreferrer" v-if="credential" class="name">
			<span>{{ name }}</span>
		</a>
		<p v-else class="name">{{ name }}</p>
		<p class="date">{{ new Intl.DateTimeFormat().format(new Date(date)) }}</p>
	</div>
</template>

<style scoped lang="scss">
.qualification {
	display: flex;
	justify-content: space-between;
	align-items: center;

	.name {
		color: getColor(--text-secondary-color);
		font-size: 1.2rem;
		font-weight: 600;
		letter-spacing: 1px;

		@include resp(lg) {
			font-size: 3.6rem;
			letter-spacing: 4px;
		}
	}

	.date {
		color: getColor(--text-secondary-color);
		font-weight: 300;

		@include resp(lg) {
			font-size: 3.2rem;
			letter-spacing: 4px;
		}
	}
}
</style>
