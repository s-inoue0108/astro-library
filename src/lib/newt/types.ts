interface CommonProps {
	_id: string;
	_sys: {
		createdAt: string;
		upstringdAt: string;
		customOrder: number;
		raw: {
			createdAt: string;
			upstringdAt: string;
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

export interface Category extends CommonProps {
	name: string;
	slug: string;
	description?: string;
	image?: NewtImageProps;
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

export interface Article extends CommonProps {
	title: string;
	slug: string;
	description?: string;
	thambnail?: NewtImageProps;
	category: Category;
	tags?: Tag[];
	content: {
		_id: string;
		type: string;
		data: string;
	};
}
