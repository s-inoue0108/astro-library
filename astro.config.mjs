import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
	server: {
		port: 3000,
	},
	integrations: [vue()],
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@import "src/styles/_mixin.scss", "src/styles/_vars.scss";`,
				},
			},
		},
	},
	output: "server",
	adapter: vercel(),
});
