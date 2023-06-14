import { JSDOM } from 'jsdom';
import IResponseHomeDTO from '.';

class Adrenaline {
  getOriginUrl(): string {
    return 'https://www.adrenaline.com.br';
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    const getContent = (elPost: Element) => {
      return {
        link: elPost.querySelector('a')?.getAttribute('href'),
        title: elPost.querySelector('a')?.getAttribute('title'),
        thumb: String(
          elPost.querySelector('img')?.getAttribute('data-lazy-srcset'),
        ).split(' ')[0],
        created_at: elPost.querySelector('.post-h__content-info span')
          ?.textContent,
      };
    };

    const postsData = [...document.querySelectorAll('article.feed')].map(
      (elPost) => getContent(elPost),
    );

    return { posts: postsData };
  }
}

export default new Adrenaline();
