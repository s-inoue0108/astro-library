<script setup lang="ts">
interface Props {
    year: number;
    month: number;
    isDisabled: boolean;
}

const { month, isDisabled } = defineProps<Props>()

const cursor = isDisabled ? "none" : "pointer";
const pointerEvents = isDisabled ? "none" : "visible";
const opacity = isDisabled ? 0.5 : 1;
</script>

<template>
    <a :href="`/blog/archive/${year}-${month}/1`" :tabindex="isDisabled ? -1 : 1" class="archive-month-card">
        <label class="month">
            {{ month }}
        </label>
    </a>
</template>

<style scoped lang="scss">
.archive-month-card {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    background: getColor(--bg-primary-color, v-bind(opacity));
    border: solid 1px getColor(--bg-secondary-color);
    pointer-events: v-bind(pointerEvents);

    &:active {
        background: $rose;
        transition: .2s ease;
    }

    .month {
        color: getColor(--text-primary-color, v-bind(opacity));
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2.4rem;
        font-weight: 700;
        letter-spacing: 1px;
        cursor: v-bind(cursor);
    }
}
</style>