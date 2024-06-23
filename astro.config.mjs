import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";
import partytown from "@astrojs/partytown";

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
		partytown({
			// Adds dataLayer.push as a forwarding-event.
			config: {
				forward: ["dataLayer.push"],
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
		ssr: {
			external: ["@resvg/resvg-js"],
		},
		optimizeDeps: {
			exclude: ["@resvg/resvg-js"],
		},
	},
	output: "hybrid",
	adapter: vercel({
		webAnalytics: {
			enabled: true,
		},
	}),
});
