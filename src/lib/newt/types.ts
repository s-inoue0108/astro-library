interface CommonProps {
	_id: string;
	_sys: {
		createdAt: string;
		updatedAt: string;
		customOrder: number;
		raw: {
			createdAt: string;
			updatedAt: string;
			firstPublishedAt: string;
			publishedAt: string;
		};
	};
}

export interface NewtImageProps {
	_id: string;
	src: string;
	fileName: string;
	fileType: string;
	fileSize: number;
	width: number;
	height: number;
	title: string;
	altText: string;
	description: string;
	metadata: unknown;
}

export interface NewtFileProps {
	_id: string;
	src: string;
	fileName: string;
	fileType: string;
	fileSize: number;
	width: null;
	height: null;
	title: string;
	altText: string;
	description: string;
	metadata: unknown;
}

// Blog
export interface Category extends CommonProps {
	name: string;
	slug: string;
	description?: string;
	image: NewtImageProps;
	svgIconPath: string;
	svgViewBox: string;
	themeColor: string;
}

export interface Tag extends CommonProps {
	name: string;
	slug: string;
	icon?: NewtImageProps;
	parentCategory: Category;
}

export interface DevLink extends CommonProps {
	title: string;
	href: string;
	description?: string;
	icon?: NewtImageProps;
}

export interface DocumentFile extends CommonProps {
	title: string;
	file: NewtFileProps;
}

export interface Article extends CommonProps {
	title: string;
	slug: string;
	description?: string;
	thambnail?: NewtImageProps;
	category: Category;
	tags?: Tag[];
	content: {
		_id: string;
		type: "RICH_TEXT" | "MARKDOWN";
		data: string;
	};
	relatedArticles?: Article[];
}

// プレビュー用
export interface RawArticle extends CommonProps {
	title: string;
	slug: string;
	description?: string;
	thambnail: NewtImageProps;
	category: Category;
	tags?: Tag[];
	content: {
		_id: string;
		type: "RICH_TEXT" | "MARKDOWN";
		raw: {
			htmlText: string;
		};
	};
	relatedArticles?: Article[];
}

// Profile

export interface Skill extends CommonProps {
	name: string;
	category: string;
	color: string;
	level: number;
	icon: NewtImageProps;
}

export interface Work extends CommonProps {
	title: string;
	description?: string;
	images: NewtImageProps[];
	stacks?: Skill[];
	url?: string;
	repo?: string;
}

export interface Qualification extends CommonProps {
	name: string;
	image?: NewtImageProps;
	date: string;
	credential?: {
		id: string;
		type: string;
		data: string | NewtImageProps;
	};
}
