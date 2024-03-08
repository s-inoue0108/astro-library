<script setup lang="ts">
import { ref, computed } from "vue";

interface Props {
    title: string;
    isInitOpen?: boolean
}

const { title, isInitOpen } = withDefaults(defineProps<Props>(), {
    isInitOpen: true,
})

const isOpen = ref<boolean>(isInitOpen);
const btnIconPath = computed<string>(() => {
    return isOpen.value ? "M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"
        : "M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
})

const toggleOpen = (): void => {
    isOpen.value = !isOpen.value
}
</script>

<template>
    <div class="modal">
        <div class="modal-info">
            <h1 class="title">
                {{ title }}
            </h1>
            <button type="button" @click="toggleOpen" class="toggle-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path :d="btnIconPath" />
                </svg>
            </button>
        </div>
        <Transition name="collapse">
            <div v-if="isOpen">
                <div class="border" />
                <slot />
            </div>
        </Transition>
    </div>
</template>

<style scoped lang="scss">
.modal {
    border: solid 2px getColor(--border-color);
    border-radius: 4px;
    background: getColor(--bg-secondary-color);
    padding: 0.5rem;
    margin: 1rem 0;

    .modal-info {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .title {
            font-size: 1.2rem;
            font-weight: 700;
        }

        .toggle-button {
            width: max-content;
            height: 1.2rem;

            svg {
                width: 100%;
                height: 100%;
                fill: getColor(--text-primary-color);
            }
        }
    }

    .border {
        border: dashed 1px getColor(--border-color);
        border-radius: 2px;
        margin: 0.5rem 0;
    }
}

.collapse-enter-from,
.collapse-leave-to {
    max-height: 0;
    opacity: 0;
}

.collapse-enter-active,
.collapse-leave-active {
    transition: .3s ease-in-out;
}

.collapse-enter-to,
.collapse-leave-from {
    max-height: 1024px;
    opacity: 1;
}

.collapse-open {
    animation: .3s ease-in-out collapse-open;
}
</style>