import { JSDOM } from 'jsdom';
import ITrendDTO, { ISource, ISearchParams, IShowDetailMagnetDTO, Answer, IResponseHomeDTO } from '.';

class Voxel implements ISource {
  getOriginUrl(): string {
    return 'https://www.tecmundo.com.br/voxel';
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    const getContent = (elPost: Element) => {
      return {
        link: elPost.querySelector('a.tec--card__title__link')?.getAttribute('href'),
        title: elPost.querySelector('a.tec--card__title__link')?.textContent,
        thumb: elPost.querySelector('img')?.getAttribute('data-src'),
        created_at: elPost.querySelector('.tec--timestamp')?.textContent,
      };
    };

    const postsData = [
      ...document.querySelectorAll('.tec--list__item article'),
    ].map((elPost) => getContent(elPost));

    return { posts: [...postsData] };
  }
}

export default new Voxel();
