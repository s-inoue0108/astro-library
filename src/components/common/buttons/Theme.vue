<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

type Theme = 'light' | 'dark';

const theme = ref<Theme | undefined>(undefined);

const svgPath = computed<string>(() => {
    return theme.value === 'dark' ? "M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z" : "M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"
})

const currentTheme = computed<string>(() => {
    return theme.value === 'dark' ? 'LIGHT' : 'DARK'
})

const setAndRemoveClass = (currentTheme: Theme): void => {
    if (currentTheme === 'dark') {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
    } else if (currentTheme === 'light') {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
    }
}

const toggleTheme = (): void => {
    if (theme.value === 'dark') {
        theme.value = 'light';
        localStorage.setItem('theme', 'light');
        setAndRemoveClass(theme.value);
    } else if (theme.value === 'light') {
        theme.value = 'dark';
        localStorage.setItem('theme', 'dark');
        setAndRemoveClass(theme.value);
    }
}

onMounted(() => {
    if (
        (typeof localStorage.getItem('theme') === 'string' &&
            localStorage.getItem('theme') === 'dark') ||
        // 初期表示時にmatchMediaに合わせる
        (typeof window.localStorage.getItem('theme') !== 'string' &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
        theme.value = 'dark';
        setAndRemoveClass(theme.value);
    } else {
        theme.value = 'light';
        setAndRemoveClass(theme.value);
    }
})
</script>

<template>
    <button type="button" @click="toggleTheme" :class="[theme === 'dark' ? 'sun' : 'moon']">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path :d="svgPath" />
        </svg>
        <label>{{ currentTheme }}</label>
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
        transition: .2s ease;
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
        color: var(--text-primary-color);

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