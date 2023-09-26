import { JSDOM } from 'jsdom';
import ITrendDTO, { ISource, ISearchParams, IShowDetailMagnetDTO, Answer, IResponseHomeDTO } from '.';

class StartUol implements ISource {
  getOriginUrl(): string {
    return 'https://www.uol.com.br/start';
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
        link: `${url}${elPost.querySelector('a')?.getAttribute('href')}`,
        title: replaceSpaces(String(elPost.querySelector('a')?.textContent)),
        thumb: elPost.querySelector('[data-src]')?.getAttribute('data-src'),
        created_at: '',
      };
    };

    const postsData = [...document.querySelectorAll('.thumbnails-item'),]
      .map((elPost) => getContent(elPost))
      //.filter((elPost) => (elPost.thumb && elPost.title != "undefined"));

    return { posts: [...postsData] };
  }
}

export default new StartUol();
