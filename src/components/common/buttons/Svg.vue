<script setup lang="ts">
interface Props {
    svgIconPath?: string;
    svgViewBox?: string;
    svgFillColor?: string;
    isLink?: boolean;
    linkUrl?: string;
    event?: () => void;
    currentPath?: string;
    testPathRegex?: RegExp;
    title?: string;
    widthScale?: number;
    heightScale?: number;
    radius?: string;
}

const { svgIconPath, svgViewBox, isLink, linkUrl, event, currentPath, testPathRegex, title, widthScale, heightScale } = withDefaults(defineProps<Props>(), {
    svgViewBox: "0 0 512 512",
    isLink: false,
    widthScale: 1,
    heightScale: 1,
    radius: "9999px",
})

const isCurrent = (currentPath?: string, testPathRegex?: RegExp): boolean => {
    if (!currentPath || !testPathRegex) {
        return false
    }
    return testPathRegex.test(currentPath)
};
</script>

<template>
    <a :href="linkUrl" v-if="isLink">
        <div class="ring" :class="[isCurrent(currentPath, testPathRegex) ? 'bgborder' : 'bgtransparent']">
            <svg xmlns="http://www.w3.org/2000/svg" :viewBox="svgViewBox" v-if="svgIconPath">
                <path :d="svgIconPath" />
            </svg>
            <label v-if="title">
                {{ title }}
            </label>
        </div>
    </a>
    <button type="button" @click="event" v-else>
        <div class="ring">
            <svg xmlns="http://www.w3.org/2000/svg" :viewBox="svgViewBox" v-if="svgIconPath">
                <path :d="svgIconPath" />
            </svg>
            <label v-if="title">
                {{ title }}
            </label>
        </div>
    </button>
</template>

<style scoped lang="scss">
a,
button {
    width: 100%;
    height: 100%;

    &:active {
        opacity: .5;
        transition: .3s ease;
    }

    .ring {
        position: relative;
        border: solid 2px getColor(--border-color);
        border-radius: v-bind(radius);
        width: calc(36px * v-bind(widthScale));
        height: calc(36px * v-bind(heightScale));
        box-shadow: 0 0 7px getColor(--border-color);

        @include resp(sm) {
            width: calc(48px * v-bind(widthScale));
            height: calc(48px * v-bind(heightScale));
        }

        @include resp(lg) {
            width: calc(64px * v-bind(widthScale));
            height: calc(64px * v-bind(heightScale));
        }

        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;

        svg {
            height: 60%;
            fill: v-bind(svgFillColor);
        }

        label {
            font-size: 1.2rem;
            font-weight: 300;
            white-space: nowrap;
            cursor: pointer;

            @include resp(sm) {
                font-size: 1.6rem;
            }

            @include resp(lg) {
                font-size: 2rem;
            }
        }
    }
}


.bgborder {
    background: getColor(--border-color);
}

.bgtransparent {
    background: transparent;
}
</style>