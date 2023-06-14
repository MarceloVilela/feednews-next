import { JSDOM } from 'jsdom';
import IResponseHomeDTO from '.';

class UolTecnologia {
  getOriginUrl(): string {
    return 'https://www.uol.com.br/tilt';
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    const getContent = (elPost: Element) => {
      return {
        link: elPost.querySelector('a')?.getAttribute('href'),
        title: elPost.querySelector('h3')?.textContent,
        thumb: elPost.querySelector('img')?.getAttribute('data-src'),
        created_at: '',
      };
    };

    const postsData = [...document.querySelectorAll('.thumbnails-wrapper')]
      .map((elPost) => getContent(elPost))
      .filter(
        ({ thumb, link }) =>
          thumb?.includes('http') && link?.includes(this.getOriginUrl()),
      );

    return { posts: postsData };
  }
}

export default new UolTecnologia();
