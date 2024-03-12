/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly APP_NAME: string;
	readonly APP_URL: string;
	readonly APP_ADMIN_MAIL: string;
	readonly NEWT_SPACE_UID: string;
	readonly NEWT_CDN_API_TOKEN: string;
	readonly NEWT_ARTICLE_PREVIEW_SECRET: string;
	readonly PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY: string;
	readonly PUBLIC_NEWT_CONTACT_FORM_ENDPOINT: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
