<script setup lang="ts">
import { svgPaths, svgViewBoxes } from "../../../lib/svg/paths";
</script>

<template>
    <a href="/blog/search">
        <svg xmlns="http://www.w3.org/2000/svg" :viewBox="svgViewBoxes.magnifyingGlass">
            <path :d="svgPaths.magnifyingGlass" />
        </svg>
        <label>SEARCH</label>
    </a>
</template>

<style scoped lang="scss">
a {
    width: 20px;
    height: 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    &:active {
        opacity: .5;
        transition: .3s ease;
    }

    @include resp(sm) {
        width: 30px;
        height: 30px;
    }

    @include resp(lg) {
        width: 40px;
        height: 40px;
    }

    svg {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);

        fill: $rose;

        @include resp(lg) {
            width: 60%;
            height: 60%;
        }
    }

    label {
        cursor: pointer;
        display: none;
        font-size: 0.8rem;
        white-space: nowrap;
        position: absolute;
        bottom: -4px;
        left: 50%;
        transform: translateX(-50%);
        color: getColor(--text-primary-color);

        @include resp(lg) {
            display: block;
        }
    }
}
</style>