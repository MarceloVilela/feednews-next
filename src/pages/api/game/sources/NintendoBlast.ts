import { JSDOM } from 'jsdom';
import ITrendDTO, { ISource, ISearchParams, IShowDetailMagnetDTO, Answer, IResponseHomeDTO } from '.';

class NintendoBlast implements ISource {
  getOriginUrl(): string {
    return 'https://www.nintendoblast.com.br/';
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
        title: replaceSpaces(String(elPost.querySelector('.entry-title')?.textContent)),
        thumb: elPost.querySelector('.index-thumbnail')?.getAttribute('style') && String(elPost.querySelector('.index-thumbnail')?.getAttribute('style')).split('(')[1]
          ? String(elPost.querySelector('.index-thumbnail')?.getAttribute('style')).split('(')[1].split(')')[0]
          : '',
        created_at: '',
      };
    };

    const postsData = [...document.querySelectorAll('.blog-posts .index-post'),]
      .map((elPost) => getContent(elPost))
      .filter((elPost) => (elPost.thumb && elPost.title != "undefined"));

    return { posts: [...postsData] };
  }
}

export default new NintendoBlast();
