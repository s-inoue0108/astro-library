/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly APP_NAME: string;
	readonly APP_URL: string;
	readonly APP_ADMIN_MAIL: string;
	readonly NEWT_SPACE_UID: string;
	readonly NEWT_CDN_API_TOKEN: string;
	readonly NEWT_ARTICLE_PREVIEW_SECRET: string;
}
