<script setup lang="ts">
import { ref, computed } from "vue";
import { svgPaths, svgViewBoxes, type SvgMetadata } from "../../../lib/svg/paths"

interface Props {
    title: string;
    svgIconPath?: string;
    svgViewBox?: string;
    isInitOpen?: boolean
}

const { title, svgIconPath, svgViewBox, isInitOpen } = withDefaults(defineProps<Props>(), {
    isInitOpen: true,
})

const isOpen = ref<boolean>(isInitOpen);

const btnIconSvg = computed<SvgMetadata>(() => {
    return isOpen.value ? {
        path: svgPaths.chevronUp,
        viewBox: svgViewBoxes.chevronUp,
    } : {
        path: svgPaths.chevronDown,
        viewBox: svgViewBoxes.chevronDown,
    }
})

const toggleOpen = (): void => {
    isOpen.value = !isOpen.value
}
</script>

<template>
    <div class="modal">
        <div class="modal-info">
            <div class="title-section">
                <svg xmlns="http://www.w3.org/2000/svg" :viewBox="svgViewBox" v-if="svgIconPath">
                    <path :d="svgIconPath" />
                </svg>
                <h1 class="title">
                    {{ title }}
                </h1>
            </div>
            <button type="button" @click="toggleOpen" class="toggle-button">
                <svg xmlns="http://www.w3.org/2000/svg" :viewBox="btnIconSvg.viewBox">
                    <path :d="btnIconSvg.path" />
                </svg>
            </button>
        </div>
        <Transition name="collapse">
            <div v-show="isOpen">
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

        .title-section {
            width: calc(100% - 1.2rem);
            display: flex;
            align-items: center;
            gap: 0.5rem;

            @include resp(lg) {
                width: calc(100% - 1.6rem);
                gap: 1rem;
            }

            svg {
                height: 1.2rem;
                fill: getColor(--text-primary-color);

                @include resp(lg) {
                    height: 1.6rem;
                }
            }

            .title {
                font-size: 1.2rem;
                font-weight: 700;
                white-space: nowrap;

                @include resp(lg) {
                    font-size: 1.6rem;
                }
            }

        }

        .toggle-button {
            width: 1.2rem;
            height: auto;

            @include resp(lg) {
                width: 1.6rem;
            }

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