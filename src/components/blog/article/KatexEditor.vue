<script setup lang="ts">
import "@fontsource/source-code-pro/600.css";
import { computed, ref } from "vue";
import katex from "katex";
import "katex/dist/katex.min.css";
import { svgPaths, svgViewBoxes } from "../../../lib/svg/paths";
import SvgButton from "../../common/buttons/Svg.vue";

const isDisplay = ref<boolean>(false);
const text = ref<string>("");

const renderedDom = computed<string>(() => {
	try {
		return katex.renderToString(text.value, { output: "html", displayMode: isDisplay.value });
	} catch {
		return "Rendering Error";
	}
});

const copyBtnColor = computed<string>(() => {
	return isDisplay.value ? "rgb(14 165 233)" : "rgb(251 113 133)";
});

const copy = async (): Promise<void> => {
	if (isDisplay.value) {
		await navigator.clipboard.writeText("$$ " + text.value + " $$");
	} else {
		await navigator.clipboard.writeText(" $ " + text.value + " $ ");
	}
};

const reset = async (): Promise<void> => {
	text.value = "";
};
</script>

<template>
	<div class="katex-editor">
		<div class="close-btn">
			<SvgButton
				:svg-icon-path="svgPaths.xmark"
				:svg-view-box="svgViewBoxes.xmark"
				btn-id="katex-editor-close-btn"
			/>
		</div>
		<div class="config">
			<h1 class="title">KaTeX Editor</h1>
			<label for="toggle" class="toggle-btn">
				<input id="toggle" type="checkbox" v-model="isDisplay" />
			</label>
			<button type="button" @click="copy" class="copy-btn">
				<svg xmlns="http://www.w3.org/2000/svg" :viewBox="svgViewBoxes.copy">
					<path :d="svgPaths.copy"></path>
				</svg>
			</button>
			<button type="button" @click="reset" class="reset-btn">
				<svg xmlns="http://www.w3.org/2000/svg" :viewBox="svgViewBoxes.deleteLeft">
					<path :d="svgPaths.deleteLeft"></path>
				</svg>
			</button>
		</div>
		<textarea v-model="text" type="text" class="text-area" />
		<div v-html="renderedDom" class="rendered" />
	</div>
</template>

<style scoped lang="scss">
.katex-editor {
	color: getColor(--text-primary-color);
	width: 100%;
	height: 100%;
	background: getColor(--bg-primary-color);
	border: solid 4px getColor(--border-color);
	border-radius: 12px;

	.config {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin: 1rem;

		@include resp(lg) {
			gap: 4rem;
		}

		.title {
			font-weight: 700;

			@include resp(lg) {
				font-size: 2.8rem;

				letter-spacing: 1.2px;
			}
		}

		.copy-btn,
		.reset-btn {
			width: 1rem;

			@include resp(lg) {
				width: 2.4rem;
			}

			&:active {
				opacity: 0.5;
				transition: 0.2s all;
			}
		}

		.copy-btn {
			svg {
				width: 100%;
				height: 100%;
				fill: v-bind(copyBtnColor);
			}
		}

		.reset-btn {
			svg {
				width: 100%;
				height: 100%;
				fill: getColor(--border-color);
			}
		}

		.toggle-btn {
			display: flex;
			align-items: center;
			position: relative;
			width: 100px;
			height: 50px;
			border-radius: 50px;
			box-sizing: content-box;
			background-color: #fecdd3;
			cursor: pointer;
			transition: background-color 0.4s;
		}

		.toggle-btn:has(:checked) {
			background-color: #bae6fd;
		}

		.toggle-btn::before {
			position: absolute;
			left: 5px;
			width: 42px;
			height: 42px;
			border-radius: 50%;
			background-color: $rose;
			content: "";
			transition: left 0.4s;
		}

		.toggle-btn:has(:checked)::before {
			left: 50px;
			background-color: $sky;
		}

		.toggle-btn::after {
			position: absolute;
			left: 26px;
			transform: translateX(-50%);
			color: getColor(--text-primary-color);
			font-weight: 600;
			font-size: 0.9em;
			content: "INL";
			transition: left 0.4s;
			white-space: nowrap;
		}

		.toggle-btn:has(:checked)::after {
			left: 71px;
			content: "DSP";
			white-space: nowrap;
		}

		.toggle-btn input {
			display: none;
		}
	}

	.close-btn {
		position: absolute;
		top: 1rem;
		right: 1rem;
		fill: getColor(--text-primary-color);
	}

	.text-area {
		display: block;
		margin: 2rem auto;
		width: 90%;
		height: 40%;
		background: getColor(--bg-secondary-color);
		border: solid 2px getColor(--border-color);
		border-radius: 10px;
		resize: none;

		font-family: "Source Code Pro", Consolas, monospace;
		font-size: 2rem;
		font-weight: 600;
		padding: 1rem;
		letter-spacing: 1px;

		&:focus {
			border-color: getColor(--text-primary-color);
			outline: none;
			transition: 0.2s ease;
		}
	}

	.rendered {
		display: block;
		margin: auto;
		width: 90%;
		max-height: 40%;
		font-size: 3rem;
		font-weight: 600;
		overflow-x: auto;
		overflow-y: hidden;
		text-align: center;
	}
}
</style>
