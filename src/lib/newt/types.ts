export interface Article {
	title: string;
	slug: string;
	description: string;
	thambnail: {
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
	};
	category: string;
	color: string;
	tags: string[];
	content: {
		_id: string;
		type: string;
		data: string;
	};
}
