import { getArticles, getCategories, getTags } from "./client";

export const articles = await getArticles();
export const categories = await getCategories();
export const tags = await getTags();
