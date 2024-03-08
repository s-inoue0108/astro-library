<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { svgPaths } from "../../../lib/svg/paths"

type Theme = 'light' | 'dark';

const theme = ref<Theme | null>(null);

const svgPath = computed<string>(() => {
    return theme.value === 'dark' ? svgPaths.moon : svgPaths.sun
})

const switchTheme = (theme: Theme): void => {
    if (theme === 'dark') {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
    }
}

const toggleTheme = async (): Promise<void> => {
    if (theme.value === 'dark') {
        theme.value = 'light';
    } else {
        theme.value = 'dark';
    }
    localStorage.setItem('theme', theme.value);
    await switchTheme(theme.value);
}

onMounted(() => {
    if (
        (typeof localStorage.getItem('theme') === 'string' &&
            localStorage.getItem('theme') === 'dark')
        ||
        (typeof window.localStorage.getItem('theme') !== 'string' &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
        theme.value = 'dark';
    } else {
        theme.value = 'light';
    }
})
</script>

<template>
    <button type="button" @click="toggleTheme" :class="[theme === 'dark' ? 'moon' : 'sun']">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path :d="svgPath" />
        </svg>
        <label>{{ theme ? theme.toUpperCase() : "" }}</label>
    </button>
</template>

<style scoped lang="scss">
button {
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

.sun {
    fill: $orange;
}

.moon {
    fill: $amber;
}
</style>