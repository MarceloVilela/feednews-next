import { JSDOM } from 'jsdom';
import IResponseHomeDTO from '.';

class ShowMeTech {
  getOriginUrl(): string {
    return 'https://www.showmetech.com.br';
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    const getContent = (elPost: Element) => {
      return {
        link: elPost.querySelector('.entry-title a')?.getAttribute('href'),
        title: elPost.querySelector('.entry-title a')?.textContent,
        thumb: elPost
          .querySelector('img[data-lazy-src]')
          ?.getAttribute('data-lazy-src'),
        created_at: '',
      };
    };

    const postsData = [...document.querySelectorAll('.abr-post-item')]
      .map((elPost) => getContent(elPost))
      .filter((item) => item.thumb);

    return { posts: postsData };
  }
}

export default new ShowMeTech();
