import type { NewsSourcesResponse, NewsArticlesResponse } from '../../types/news';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    getSources(callback: (data: NewsSourcesResponse) => void): void {
        super.getResp<NewsSourcesResponse>(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: Event, callback: (data: NewsArticlesResponse) => void): void {
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
                    super.getResp<NewsArticlesResponse>(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
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
