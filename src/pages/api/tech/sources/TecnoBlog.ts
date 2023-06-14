import { JSDOM } from 'jsdom';
import IResponseHomeDTO from '.';

// https://medium.com/@alexalvess/criando-uma-api-em-net-core-baseado-na-arquitetura-ddd-2c6a409c686
// https://pt.stackoverflow.com/questions/82976/oque-%C3%A9-cross-cutting-e-qual-sua-rela%C3%A7%C3%A3o-com-aspect-oriented-programming-aop
class TecnoBlog {
  getOriginUrl(): string {
    return 'https://tecnoblog.net';
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(url);
    const { document } = response.window;

    const getContent = (elPost: Element) => {
      const elInfoDate = elPost.querySelector('.info');
      const textualDate = elInfoDate ? String(elInfoDate.textContent) : '';
      const created_at = textualDate.split(' por')[0];

      return {
        link: elPost.querySelector('a')?.getAttribute('href'),
        title: elPost.querySelector('h2')?.textContent,
        thumb: elPost
          .querySelector('img[data-lazy-src]')
          ?.getAttribute('data-lazy-src'),
        // preview: '',
        created_at,
      };
    };

    const postsData = [...document.querySelectorAll('article.bloco')].map(
      (elPost) => getContent(elPost),
    );

    return { posts: postsData };
  }
}

export default new TecnoBlog();
