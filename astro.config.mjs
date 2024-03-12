import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
	server: {
		port: 3000,
	},
	integrations: [vue(), react()],
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@import "src/styles/_mixin.scss", "src/styles/_vars.scss";`,
				},
			},
		},
	},
	output: "hybrid",
	adapter: vercel(),
});
