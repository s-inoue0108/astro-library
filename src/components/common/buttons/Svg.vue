<script setup lang="ts">
interface Props {
    svgIconPath: string;
    svgViewBox?: string;
    svgFillColor?: string;
    isLink?: boolean;
    linkUrl?: string;
    event?: () => void;
    currentPath?: string;
    testPathRegex?: RegExp;
    title?: string;
    width?: string;
    height?: string;
    radius?: string;
}

const { svgIconPath, svgViewBox, isLink, linkUrl, event, currentPath, testPathRegex, title } = withDefaults(defineProps<Props>(), {
    svgViewBox: "0 0 512 512",
    isLink: false,
    width: "36px",
    height: "36px",
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
        <div class="ring" :class="[isCurrent(currentPath, testPathRegex) ? 'bgborder' : 'bgsecondary']">
            <svg xmlns="http://www.w3.org/2000/svg" :viewBox="svgViewBox">
                <path :d="svgIconPath" />
            </svg>
            <label v-if="title">
                {{ title }}
            </label>
        </div>
    </a>
    <button type="button" @click="event" v-else>
        <div class="ring">
            <svg xmlns="http://www.w3.org/2000/svg" :viewBox="svgViewBox">
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

    &:active {
        opacity: .5;
        transition: .3s ease;
    }

    .ring {
        margin: calc(v-bind(height) / 8);
        position: relative;
        border: solid 2px getColor(--border-color);
        border-radius: v-bind(radius);
        width: v-bind(width);
        height: v-bind(height);
        box-shadow: 0 0 7px getColor(--border-color);

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
        }
    }
}


.bgborder {
    background: getColor(--border-color);
}

.bgsecondary {
    background: getColor(--bg-secondary-color);
}
</style>