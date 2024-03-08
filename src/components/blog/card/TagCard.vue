<script setup lang="ts">
import type { Tag } from "../../../lib/newt/types.ts";
// Life Cycle Hooks
import { computed } from "vue";

interface Props {
    tag: Tag;
    isLink?: boolean
}

const { tag, isLink } = withDefaults(defineProps<Props>(), {
    isLink: true,
})

const themeColor = computed<string>(() => {
    return tag.parentCategory.themeColor
})
</script>

<template>
    <a :href="`/blog/tag/${tag.slug}/1`" class="tag" v-if="isLink">
        <img :src="tag.icon.src" :alt="tag.icon?.altText ?? ''" v-if="tag.icon" />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" v-else>
            <path
                d="M0 80V229.5c0 17 6.7 33.3 18.7 45.3l176 176c25 25 65.5 25 90.5 0L418.7 317.3c25-25 25-65.5 0-90.5l-176-176c-12-12-28.3-18.7-45.3-18.7H48C21.5 32 0 53.5 0 80zm112 32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
        </svg>
        <label>{{ tag.name }}</label>
    </a>
    <div class="tag" v-else>
        <img :src="tag.icon.src" :alt="tag.icon?.altText ?? ''" v-if="tag.icon" />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" v-else>
            <path
                d="M0 80V229.5c0 17 6.7 33.3 18.7 45.3l176 176c25 25 65.5 25 90.5 0L418.7 317.3c25-25 25-65.5 0-90.5l-176-176c-12-12-28.3-18.7-45.3-18.7H48C21.5 32 0 53.5 0 80zm112 32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
        </svg>
        <label>{{ tag.name }}</label>
    </div>
</template>

<style scoped lang="scss">
.tag {
    cursor: pointer;
    background: v-bind(themeColor);
    border-radius: 4px;
    padding: 0.2rem;
    height: 100%;
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;

    img {
        height: 0.8rem;
        object-fit: contain;
    }

    svg {
        height: 0.8rem;
        fill: getColor(--text-primary-color);
    }

    label {
        font-size: 0.8rem;
        font-weight: 700;
    }
}
</style>