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
		<a :href="url" target="_blank" rel="noopener noreferrer" v-if="credential">
			{{ name }}
		</a>
		<p v-else>{{ name }}</p>
		<p>{{ new Intl.DateTimeFormat().format(new Date(date)) }}</p>
	</div>
</template>

<style scoped lang="scss"></style>
