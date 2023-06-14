import { JSDOM } from 'jsdom';
import IResponseHomeDTO from '.';

class FourGNews {
  getOriginUrl(): string {
    return 'https://4gnews.pt';
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    const getContent = (elPost: Element) => {
      return {
        link: this.getOriginUrl() + elPost.getAttribute('href'),
        title: elPost?.getAttribute('title'),
        thumb: elPost.querySelector('img.thumb')?.getAttribute('src'),
        created_at: elPost.querySelector('time')?.textContent,
      };
    };

    const postsData = [
      ...document.querySelectorAll('.ncl-list-miur .post-list'),
    ].map((elPost) => getContent(elPost));

    return { posts: postsData };
  }
}

export default new FourGNews();
