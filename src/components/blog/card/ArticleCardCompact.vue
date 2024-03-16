<script setup lang="ts">
import type { Article } from '../../../lib/newt/types';

interface Props {
    article: Pick<Article, "title" | "description" | "slug">;
}

const { article } = defineProps<Props>()

const sliceText = (text: string | undefined, limit: number): string => {
    if (!text || text.length === 0) {
        return "";
    }
    if (text && text.length > limit) {
        return `${text.slice(0, limit)}...`;
    }
    return text;
};
</script>

<template>
    <a :href="`/blog/article/${article.slug}`">
        <ul class="info">
            <li class="title">
                <h2>{{ sliceText(article.title, 50) }}</h2>
            </li>
            <li class="description">
                <p>{{ sliceText(article.description, 100) }}</p>
            </li>
        </ul>
    </a>
</template>

<style scoped lang="scss">
a {
    width: 100%;
    height: 100%;
    display: block;
    padding: 0.3rem 0;
    border-bottom: solid 1px getColor(--border-color);

    &:active {
        color: $rose;
        border-color: $rose;
        transition: .2s ease;
    }

    .info {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        .title {
            font-weight: 700;
        }

        .description {
            color: getColor(--text-secondary-color);
            font-size: 0.7rem;
            font-weight: 300;
        }
    }
}
</style>