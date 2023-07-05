import { JSDOM } from 'jsdom';
import ITrendDTO, { ISource, ISearchParams, IShowDetailMagnetDTO, Answer, IResponseHomeDTO } from '.';

class PsxBrasil implements ISource {
  getOriginUrl(): string {
    return 'https://psxbrasil.com.br';
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

    const getContent = (elPost: Element) => {
      return {
        link: elPost.querySelector('.entry-title a')?.getAttribute('href'),
        title: replaceSpaces(String(elPost.querySelector('.entry-title a')?.textContent)),
        thumb: elPost.querySelector('img')?.getAttribute('data-lazy-src'),
        created_at: '',
      };
    };

    const postsData = [...document.querySelectorAll('.td_block_inner .td_module_wrap'),]
      .map((elPost) => getContent(elPost))
      .filter((elPost) => (elPost.thumb && elPost.title != "undefined"));

    return { posts: [...postsData] };
  }
}

export default new PsxBrasil();
