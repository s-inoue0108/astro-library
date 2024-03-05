<script setup lang="ts">
interface Props {
    headings: string[]
}

const { headings } = defineProps<Props>()
</script>

<template>
    <div class="toc-title">
        Contents
    </div>
    <ul class="headings">
        <li v-for="heading in headings" :key="heading" class="heading">
            <a :href="`#${heading}`">{{ heading }}</a>
        </li>
    </ul>
</template>

<style scoped lang="scss">
.headings {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .heading {
        font-weight: 600;
    }
}
</style>