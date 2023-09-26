import { JSDOM } from 'jsdom';
import ITrendDTO, { ISource, ISearchParams, IShowDetailMagnetDTO, Answer, IResponseHomeDTO } from '.';

class Adrena implements ISource {
  getOriginUrl(): string {
    return 'https://www.adrenaline.com.br/games';
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
        link: elPost.querySelector('a')?.getAttribute('href'),
        title: replaceSpaces(String(elPost.querySelector('.feed-title')?.textContent)),
        thumb: elPost.querySelector('img')?.getAttribute('data-lazy-src'),
        created_at: '',
      };
    };

    const postsData = [...document.querySelectorAll('article.feed'),]
      .map((elPost) => getContent(elPost))
      .filter((elPost) => (elPost.thumb && elPost.title != "undefined"));

    return { posts: [...postsData] };
  }
}

export default new Adrena();
