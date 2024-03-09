<script setup lang="ts">
import { ref, computed } from "vue";
import { svgPaths, svgViewBoxes, type SvgMetadata } from "../../../lib/svg/paths";
import type { Article } from "../../../lib/newt/types";
import { getSegments, fuseClient, type Segment } from "../../../lib/fusejs/instance";
import type { FuseResult } from "fuse.js";

const keyword = ref<string>("")

const svgMetadata = computed<SvgMetadata>(() => {
    return keyword.value && keyword.value !== "" ? {
        path: svgPaths.xmark,
        viewBox: svgViewBoxes.xmark,
    } : {
        path: svgPaths.magnifyingGlass,
        viewBox: svgViewBoxes.magnifyingGlass,
    }
})

interface Props {
    articles: Article[]
}

const { articles } = defineProps<Props>();

const segments = await getSegments(articles);
const fuse = await fuseClient(segments);

const hits = computed<FuseResult<Segment>[]>(() => {
    return fuse.search(keyword.value);
})

const getShowedArticles = (hits: FuseResult<Segment>[]): Article[] => {
    const returnArticles: Article[] = [];
    hits.forEach((hit) => {
        const filteredArticles = articles.filter((article) => {
            return article.slug === hit.item.relateSlug
        })
        returnArticles.push(...filteredArticles)
    })
    return Array.from(new Map(returnArticles.map((article) => [JSON.stringify(article), article])).values());
}

const showedArticles = computed<Article[]>(() => {
    return getShowedArticles(hits.value)
})

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
    <div class="text-input">
        <input v-model="keyword" type="text" placeholder="キーワードを入力" />
        <button type="button" @click="() => keyword = ''">
            <svg xmlns="http://www.w3.org/2000/svg" :viewBox="svgMetadata.viewBox">
                <path :d="svgMetadata.path" />
            </svg>
        </button>
    </div>
    <ul class="hit-articles" v-if="showedArticles && showedArticles.length > 0">
        <li v-for="article in showedArticles" :key="article._id" class="card-compact">
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
        </li>
    </ul>
    <div class="no-hit" v-else>
        <svg xmlns="http://www.w3.org/2000/svg" :viewBox="svgViewBoxes.magnifyingGlass">
            <path :d="svgPaths.magnifyingGlass" />
        </svg>
        <h1>記事を検索</h1>
    </div>
</template>

<style scoped lang="scss">
.text-input {
    display: flex;
    align-items: center;
    width: 100%;
    height: 36px;
    box-shadow: 0 3px 3px getColor(--shadow-color);
    border-radius: 8px;

    input {
        padding: 0 0.5rem;
        width: 85%;
        height: 100%;
        border: solid 2px getColor(--border-color);
        border-right: none;
        border-radius: 8px 0 0 8px;

        &:focus {
            border-color: $rose;
            transition: .2s ease;
            outline: none;
        }

        &::placeholder {
            color: getColor(--text-secondary-color);
        }
    }

    button {
        background: $rose;
        width: 15%;
        height: 100%;
        border-radius: 0 8px 8px 0;
        position: relative;

        &:active {
            animation: click .3s ease;
        }

        svg {
            fill: getColor(--bg-primary-color);
            width: auto;
            height: 60%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        @keyframes click {
            0% {
                transform: translateY(0);
            }

            50% {
                transform: translateY(2px);
            }

            100% {
                transform: translateY(0);
            }
        }
    }
}

.hit-articles {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.7rem;
    width: 100%;
    margin-top: 2rem;

    .card-compact {
        width: 100%;

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
    }
}

.no-hit {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 5rem;
        height: auto;
        fill: getColor(--text-secondary-color);
    }

    h1 {
        position: absolute;
        top: calc(50% + 5rem);
        left: 50%;
        transform: translate(-50%, -50%);
        color: getColor(--text-secondary-color);
        font-size: 2rem;
        font-weight: 700;
        letter-spacing: 1px;
    }
}
</style>