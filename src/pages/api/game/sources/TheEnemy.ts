import { JSDOM } from 'jsdom';
import ITrendDTO, { ISource, ISearchParams, IShowDetailMagnetDTO, Answer, IResponseHomeDTO } from '.';

class TheEnemy implements ISource {
  getOriginUrl(): string {
    return 'https://www.theenemy.com.br';
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    const replaceSpaces = (text: string) => {
      return text.replace(/\n|\r|\t/g, '')
      .replace(/\n|\s{2,}/g, '')
      .replace(/\\n|\\r|\\t/g, '')
      .replace(/\s{2,}/g, '')
    }

    const addHttp = (text: string) => {
      return !text.includes('http') && !text.includes('https') 
        ? 'https' + text
        : text
    }

    const getContent = (elPost: Element) => {
      return {
        link: `${url}${elPost.querySelector('a.news-list__item__content__title')?.getAttribute('href')}`,
        title: replaceSpaces(String(elPost.querySelector('a.news-list__item__content__title')?.textContent)),
        thumb: addHttp(String(elPost.querySelector('img')?.getAttribute('src'))),
        created_at: replaceSpaces(String(elPost.querySelector('.news-list__item__content__info__time span')?.textContent)),
      };
    };

    const postsData = [
      ...document.querySelectorAll('#news-list-infinite .news-list__item'),
    ].map((elPost) => getContent(elPost));

    const getDataContent = (elPost: Element) => {
      return {
        link: elPost.getAttribute('data-storie'),
        title: replaceSpaces(String(elPost.querySelector('p.card__title')?.textContent)),
        thumb: addHttp(String(elPost.querySelector('.card__image img')?.getAttribute('src'))),
        created_at: replaceSpaces(String(elPost.querySelector('.news-list__item__content__info__time span')?.textContent)),
      };
    };

    const cardsData = [
      ...document.querySelectorAll('.webstories__list .webstories__card'),
    ].map((elPost) => getDataContent(elPost));

    return { posts: [...cardsData, ...postsData] };
  }

  async detail({ url }: IShowDetailMagnetDTO): Promise<Answer> {
    const response = await JSDOM.fromURL(url);
    //const response = await JSDOM.fromFile('./src/assets/fakes/html/magnet-source/detail/ct-detail.html');

    const { document } = response.window;

    const name = document.querySelector('h1')?.textContent
    const desc_link = document.querySelector('h1 a')?.getAttribute('href')
    const thumb = document.querySelector('.entry-content img')?.getAttribute('src');

    const getLinks = (link: Element) => {
      let text = link.closest('p')?.innerText || ''
      //text = text.replace(String(link.textContent), "")

      text = !text
        ? String(new URLSearchParams(String(link.getAttribute('href'))).get('dn'))
        : text;

      return { url: String(link.getAttribute('href')), text, type: 'magnet' }
    }

    const links = [...document.querySelectorAll('a[href^="magnet"]')]
      .map(el => getLinks(el))
      .filter(item => item.url.includes('magnet'))

    return { name: String(name), thumb: String(thumb), links, engine_url: this.getOriginUrl(), desc_link: String(desc_link) };
  }

  async parseResults(document: Document, selector: string) {

    const getContent = async (art: Element) => {
      //const { links } = await this.detail(String(art.querySelector('h2 a')?.getAttribute('href')));

      return {
        name: String(art.querySelector('h2.entry-title a')
          ?.textContent
          ?.replace(/\n|\r|\t/g, '')
          ?.replace(/\\n|\\r|\\t/g, '')
          ?.replace(/\s{2,}/g, '')),
        thumb: String(art.querySelector('img')?.getAttribute('src')),
        links: [],
        engine_url: this.getOriginUrl(),
        desc_link: String(art.querySelector('h2 a')?.getAttribute('href')),
      }
    };

    const elements = [...document.querySelectorAll(selector)];
    let contents = [];

    for (let i = 0; i < elements.length; i++) {
      contents.push(await getContent(elements[i]));
    }

    return contents;
  }

  async parseResultsAside(document: Document, selector: string) {

    const getContent = async (art: Element, thumb: Element) => {

      return {
        name: String(art.querySelector('a')
          ?.getAttribute('title')
          ?.replace(/\n|\r|\t/g, '')
          ?.replace(/\\n|\\r|\\t/g, '')
          ?.replace(/\s{2,}/g, '')),
        thumb: String(thumb.querySelector(`img`)?.getAttribute('src')),
        links: [],
        engine_url: this.getOriginUrl(),
        desc_link: String(art.querySelector('a')?.getAttribute('href')),
      }
    };

    const elements = [...document.querySelectorAll(selector)];
    let contents = [];

    for (let i = 0; i < elements.length; i++) {
      if (i % 2 === 0) {
        continue;
      }
      contents.push(await getContent(elements[i], elements[i - 1]));
    }

    return contents;
  }

  async search({ search_query }: ISearchParams): Promise<Answer[]> {
    const url = `${this.getOriginUrl()}/?s=${search_query}`
    const response = await JSDOM.fromURL(url);
    //const response = await JSDOM.fromFile('./src/modules/magnetSource/infra/crosscutting/repositories/ct.html');

    const { document } = response.window;

    const results = await this.parseResults(document, '#content article');

    return results;
  }

  async top(): Promise<ITrendDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(url);

    const { document } = response.window;
    const recents = await this.parseResults(document, '#content article');
    const top = await this.parseResultsAside(document, '#widgets-wrap-sidebar-left .textwidget>p');

    return { top, recents };
  }
}

export default new TheEnemy();
