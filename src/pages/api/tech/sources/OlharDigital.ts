import { JSDOM } from 'jsdom';
import IResponseHomeDTO from '.';

class OlharDigital {
  getOriginUrl() {
    return 'https://olhardigital.com.br';
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    const getContent = (elPost: Element) => ({
      link: elPost.getAttribute('href'),
      title: elPost.getAttribute('title'),
      thumb: elPost.querySelector('img')?.getAttribute('src'),
      // preview: '',
      created_at: '',
    });

    const postsData = [...document.querySelectorAll('a.cardV2')].map(
      (elPost) => getContent(elPost),
    );

    return { posts: postsData };
  }
}

export default new OlharDigital();
