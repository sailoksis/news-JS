import type { NewsSourcesResponse, NewsArticlesResponse } from '../../types/news';
import AppLoader from './appLoader';

interface NewsQueryOptions {
    sources: string;
    language: string;
}

type OptionalNewsQueryOptions = Partial<NewsQueryOptions>;

class AppController extends AppLoader {
    public getSources(callback: (data: NewsSourcesResponse) => void): void {
        super.getResp<NewsSourcesResponse>(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getNews(e: Event, callback: (data: NewsArticlesResponse) => void): void {
        const newsContainer = e.currentTarget;
        if (!(newsContainer instanceof Element) || !(e.target instanceof Element)) {
            return;
        }

        let target: Element | null = e.target;

        while (target && target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId === null) {
                    return;
                }
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    const options: OptionalNewsQueryOptions = {
                        sources: sourceId,
                    };
                    super.getResp<NewsArticlesResponse>(
                        {
                            endpoint: 'everything',
                            options,
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentElement;
        }
    }
}

export default AppController;
