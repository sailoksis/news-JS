import type { NewsArticle } from '../../../types/news';
import './news.css';

class News {
    draw(data: NewsArticle[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

        if (!newsItemTemp) {
            throw new Error('News template not found');
        }

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;
            const newsItem = newsClone.querySelector('.news__item');
            if (idx % 2 && newsItem) {
                newsItem.classList.add('alt');
            }
            const newsPhoto = newsClone.querySelector<HTMLElement>('.news__meta-photo');
            if (newsPhoto) {
                newsPhoto.style.backgroundImage = `url(${
                    item.urlToImage || 'img/news_placeholder.jpg'
                })`;
            }
            const newsAuthor = newsClone.querySelector('.news__meta-author');
            if (newsAuthor) {
                newsAuthor.textContent = item.author || item.source.name;
            }
            const newsDate = newsClone.querySelector('.news__meta-date');
            if (newsDate) {
                newsDate.textContent = item.publishedAt
                    .slice(0, 10)
                    .split('-')
                    .reverse()
                    .join('-');
            }

            const newsTitle = newsClone.querySelector('.news__description-title');
            if (newsTitle) {
                newsTitle.textContent = item.title;
            }

            const newsSource = newsClone.querySelector('.news__description-source');
            if (newsSource) {
                newsSource.textContent = item.source.name;
            }

            const newsDescription = newsClone.querySelector('.news__description-content');
            if (newsDescription) {
                newsDescription.textContent = item.description;
            }
            
            const newsLink = newsClone.querySelector('.news__read-more a');
            if (newsLink) {
                newsLink.setAttribute('href', item.url);
            }
            fragment.append(newsClone);
        });

        const newsContainer = document.querySelector('.news');
        if (newsContainer) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        }
    }
}

export default News;
