import type { Article, Category, Tag } from "../newt/types";

export interface Pager<T extends Article | Category | Tag> {
	data: T[];
	start: number;
	end: number;
	size: number;
	total: number;
	currentPage: number;
	lastPage: number;
	url: {
		current: string;
		next?: string;
		prev?: string;
	};
}
