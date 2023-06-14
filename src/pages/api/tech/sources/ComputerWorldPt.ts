import { JSDOM } from 'jsdom';
import IResponseHomeDTO from '.';

class ComputerWorldPt {
  getOriginUrl(): string {
    return 'https://www.computerworld.com.pt';
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    const getContent = (elPost: Element) => {
      return {
        link: elPost?.querySelector('h3.title a')?.getAttribute('href'),
        title: elPost?.querySelector('h3.title')?.textContent,
        thumb: elPost.querySelector('img')?.getAttribute('src'),
        created_at: elPost.querySelector('.meta .date')?.textContent,
      };
    };

    const postsData = [...document.querySelectorAll('ul.content li')]
      .map((elPost) => getContent(elPost))
      .filter((item) => item.thumb && item.link?.includes('http'))
      .filter((item) => item.link && item.link?.includes(this.getOriginUrl()));

    return { posts: postsData };
  }
}

export default new ComputerWorldPt();
