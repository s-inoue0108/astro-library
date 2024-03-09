<script setup lang="ts">
import type { Page } from "astro"
import type { Article } from "../../../lib/newt/types";

interface Props {
    page: Page<Article>
}

const { page } = defineProps<Props>()
</script>

<template>
    <ul class="buttons">
        <li class="prev">
            <a :href="page.url.prev">
                {{ page.url.prev }}
            </a>
        </li>
        <li class="next">
            <a :href="page.url.next">
                {{ page.url.next }}
            </a>
        </li>
    </ul>
</template>

<style scoped lang="scss">
.buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}
</style>