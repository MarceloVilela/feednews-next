import { JSDOM } from 'jsdom';
import IResponseHomeDTO from '.';

class ExameTecnologia {
  getOriginUrl(): string {
    return 'https://exame.com';
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}/tecnologia`);
    const { document } = response.window;

    const getContent = (elPost: Element) => {
      return {
        link:
          this.getOriginUrl() +
          elPost.querySelector('h2 a')?.getAttribute('href'),
        title: elPost.querySelector('h2')?.textContent,
        thumb: elPost.querySelector('img[src^="http"]')?.getAttribute('src'),
        created_at: elPost.querySelector('.list-date-description')?.textContent,
      };
    };

    const postsData = [...document.querySelectorAll('.row>div>div')]
      .map((elPost) => getContent(elPost),)
      .filter((elPost) => (elPost.thumb && elPost.title && elPost.title != "undefined"));

    return { posts: postsData };
  }
}

export default new ExameTecnologia();
