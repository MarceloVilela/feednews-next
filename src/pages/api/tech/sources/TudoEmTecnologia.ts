import { JSDOM } from 'jsdom';
import IResponseHomeDTO from '.';

class TudoEmTecnologia {
  getOriginUrl(): string {
    return 'https://tudoemtecnologia.com';
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl() + '/categoria/noticias/';
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    const getContent = (elPost: Element) => {
      return {
        link:
          elPost?.querySelector('.post-title a')?.getAttribute('href'),
        title: elPost?.querySelector('.post-title')?.textContent,
        thumb:
          elPost.querySelector('.post-thumb img')?.getAttribute('data-src'),
        created_at: '',
      };
    };

    const postsData = [...document.querySelectorAll('.post-item')].map(
      (elPost) => getContent(elPost),
    );

    return { posts: postsData };
  }
}

export default new TudoEmTecnologia();
