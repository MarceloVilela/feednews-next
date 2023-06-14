import { JSDOM } from 'jsdom';
import IResponseHomeDTO from '.';

class Tecmundo {
  getOriginUrl(): string {
    return 'https://www.tecmundo.com.br';
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(url);
    const { document } = response.window;

    const getContent = (elPost: Element) => ({
      link: elPost.querySelector('h3 a')?.getAttribute('href'),
      title: elPost.querySelector('h3')?.textContent,
      thumb: elPost.querySelector('figure img')?.getAttribute('data-src'),
      // preview: '',
      created_at: elPost.querySelector('.tec--timestamp__item')?.textContent,
    });

    const postsData = [...document.querySelectorAll('.tec--list__item')].map(
      (elPost) => getContent(elPost),
    );

    return { posts: postsData };
  }
}

export default new Tecmundo();
