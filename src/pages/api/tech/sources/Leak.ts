import { JSDOM } from 'jsdom';
import IResponseHomeDTO from '.';

class Leak {
  getOriginUrl(): string {
    return 'https://www.leak.pt';
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    const getContent = (elPost: Element) => {
      return {
        link: elPost.querySelector('.td-module-title a')?.getAttribute('href'),
        title: elPost.querySelector('.td-module-title')?.textContent,
        thumb: elPost
          .querySelector('[data-img-url]')
          ?.getAttribute('data-img-url'),
        created_at: '',
      };
    };

    const postsData = [
      ...document.querySelectorAll('.td-mc1-wrap .td_module_flex'),
    ].map((elPost) => getContent(elPost));

    return { posts: postsData };
  }
}

export default new Leak();
