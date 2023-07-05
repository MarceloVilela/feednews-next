import { JSDOM } from 'jsdom';
import IResponseHomeDTO from '.';

class SapoTek {
  getOriginUrl(): string {
    return 'https://tek.sapo.pt';
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    const getContent = (elPost: Element) => {
      const created_at_timestamp = elPost
        .querySelector('[data-timestamp]')
        ?.getAttribute('data-timestamp');
      return {
        link: `${this.getOriginUrl()}${elPost
          ?.querySelector('.title a')
          ?.getAttribute('href')}`,
        title: elPost?.querySelector('.title')?.textContent,
        thumb: `https:${elPost
          .querySelector('picture')
          ?.getAttribute('data-original-src')}`,
        created_at: new Date(Number(created_at_timestamp) * 1000).toString(),
      };
    };

    const postsData = [
      ...document.querySelectorAll('.article-list.communist .article'),
    ]
      .filter(
        (elPost) =>
          elPost?.querySelector('.title a') &&
          elPost.querySelector('picture') &&
          !elPost
            ?.querySelector('.title a')
            ?.getAttribute('href')
            ?.includes('https://desporto.sapo.pt'),
      )
      .map((elPost) => getContent(elPost))
      .filter((elPost) => (elPost.thumb && elPost.title && elPost.title != "undefined"));

    return { posts: postsData };
  }
}

export default new SapoTek();
