export interface NewsSource {
    id: string | null;
    name: string;
}

export interface NewsSourcesResponse {
    status: string;
    sources: NewsSource[];
}

export interface NewsArticle {
    source: NewsSource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface NewsArticlesResponse {
    status: string;
    totalResults: number;
    articles: NewsArticle[];
}

export type NewsCardData = Pick<
    NewsArticle,
    'source' | 'author' | 'title' | 'description' | 'url' | 'urlToImage' | 'publishedAt'
>;
