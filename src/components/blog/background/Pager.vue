<script setup lang="ts">
import type { Page } from "astro"
import type { Article } from "../../../lib/newt/types";
import SvgButton from "../../common/buttons/Svg.vue";
import { svgPaths, svgViewBoxes } from "../../../lib/svg/paths";

interface Props {
    page: Page<Article>
}

const { page } = defineProps<Props>()
</script>

<template>
    <template v-if="page.lastPage > 1">
        <ul class="buttons">
            <li class="start">
                <SvgButton :svg-icon-path="svgPaths.anglesLeft" :svg-view-box="svgViewBoxes.anglesLeft" :is-link="true"
                    :link-url="page.url.current.replace(/\/\d{1,}$/, '/1')" />
            </li>
            <!--minus 2-->
            <li v-if="page.currentPage - 2 > 0">
                <SvgButton :title="`${page.currentPage - 2}`" :is-link="true"
                    :link-url="page.url.current.replace(/\/\d{1,}$/, `/${page.currentPage - 2}`)" :width-scale="0.8"
                    :height-scale="0.8" />
            </li>
            <!--minus 1-->
            <li v-if="page.currentPage - 1 > 0">
                <SvgButton :title="`${page.currentPage - 1}`" :is-link="true" :link-url="page.url.prev"
                    :width-scale="0.8" :height-scale="0.8" />
            </li>
            <!--current-->
            <li>
                <SvgButton :title="`${page.currentPage}`" :is-link="true" :link-url="page.url.current"
                    :current-path="page.url.current" :test-path-regex="new RegExp(`\^${page.url.current}\$`)"
                    :width-scale="0.8" :height-scale="0.8" />
            </li>
            <!--plus 1-->
            <li v-if="page.currentPage + 1 <= page.lastPage">
                <SvgButton :title="`${page.currentPage + 1}`" :is-link="true" :link-url="page.url.next"
                    :width-scale="0.8" :height-scale="0.8" />
            </li>
            <!--plus 2-->
            <li v-if="page.currentPage + 2 <= page.lastPage">
                <SvgButton :title="`${page.currentPage + 2}`" :is-link="true"
                    :link-url="page.url.current.replace(/\/\d{1,}$/, `/${page.currentPage + 2}`)" :width-scale="0.8"
                    :height-scale="0.8" />
            </li>
            <li class="end">
                <SvgButton :svg-icon-path="svgPaths.anglesRight" :svg-view-box="svgViewBoxes.anglesRight"
                    :is-link="true" :link-url="page.url.current.replace(/\/\d{1,}$/, `/${page.lastPage}`)" />
            </li>
        </ul>
    </template>
</template>

<style scoped lang="scss">
.buttons {
    width: 100%;
    margin: 1rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    @include resp(sm) {
        gap: 0.7rem;
    }

    @include resp(lg) {
        gap: 1rem;
    }

    .start,
    .end {
        fill: getColor(--text-primary-color);
    }
}
</style>