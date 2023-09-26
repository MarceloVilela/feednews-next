import { JSDOM } from 'jsdom';
import ITrendDTO, { ISource, ISearchParams, IShowDetailMagnetDTO, Answer, IResponseHomeDTO } from '.';

class LanceEsports implements ISource {
  getOriginUrl(): string {
    return 'https://www.lance.com.br/esports';
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
        link: `https://www.lance.com.br${elPost.querySelector('a')?.getAttribute('href')}`,
        title: replaceSpaces(String(elPost.querySelector('a p')?.textContent)),
        //thumb: elPost.querySelector('img')?.getAttribute('srcSet')?.split(',').filter(item => item.includes('jpg'))[0],
        thumb: elPost.querySelector('img')?.getAttribute('src'),
        created_at: '',
      };
    };

    const postsData = [...document.querySelectorAll('div[class^="styles_card"]'),]
      .map((elPost) => getContent(elPost))
      .filter((elPost) => (elPost.thumb && elPost.title != "undefined"));

    return { posts: [...postsData] };
  }
}

export default new LanceEsports();
