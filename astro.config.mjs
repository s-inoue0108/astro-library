import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
	server: {
		port: 3000,
	},
	site: "https://si-library.net",
	integrations: [
		vue(),
		react(),
		sitemap({
			filter: (page) => page !== "https://si-library.net/blog/preview/",
			i18n: {
				defaultLocale: "ja",
				locales: {
					ja: "ja-JP",
				},
			},
		}),
	],
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
	adapter: vercel({
		webAnalytics: {
			enabled: true,
		},
	}),
});
