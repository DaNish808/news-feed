import html from './article.html';
import './article.css';

import Template from '../Template';

export default class Article {
    constructor(data, i) {
        this.dom = new Template(html).clone();
        this.data = data;
        this.index = i;
    }

    buildLink() {
        const linkEl = document.createElement('a');
        linkEl.setAttribute('href', this.data.url);
        linkEl.setAttribute('target', '_blank');
        linkEl.setAttribute('rel', 'noopener noreferrer' );
        return linkEl;
    }

    buildArticle() {
        const articleEl = this.dom.querySelector('.article-container');
        articleEl.style.animationDelay = (200 + this.index * 100) + 'ms';

        // set img data
        const imgEl = this.dom.querySelector('img');
        imgEl.setAttribute('alt', this.data.title);
        if(this.data.urlToImage) {
            imgEl.setAttribute('src', this.data.urlToImage);
            imgEl.classList.remove('non-img');
        }

        // format date
        const date = this.data.publishedAt.split('T');
        this.data.publishedAt = `${date[0]} \u2014 ${date[1].slice(0, 5)}`;

        // set data for all fields except source, url, and urlToImg
        Object.keys(this.data).forEach(key => {            
            if(/author|title|description|publishedAt/.test(key))
                this.dom.querySelector('.' + key).innerText = this.data[key];
        })

        return this.dom;
    }

    render() {
        const articleEl = this.buildLink();
        articleEl.appendChild(this.buildArticle());

        return articleEl;
    }
}