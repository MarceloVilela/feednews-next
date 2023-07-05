import { JSDOM } from 'jsdom';
import IResponseHomeDTO from '.';

class GizModo {
  getOriginUrl() {
    return 'https://gizmodo.uol.com.br';
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    const getContent = (elPost: Element) => ({
      link:
        this.getOriginUrl() +
        elPost.querySelector('h3 a')?.getAttribute('href'),
      title: elPost.querySelector('h3')?.textContent?.replace(/\n|\r|\t/g, ''),
      thumb: elPost
        .querySelector('.postFeaturedImg img')
        ?.getAttribute('src'),
      created_at: elPost.querySelector('.published.updated')?.textContent,
    });

    const postsData = [
      ...document.querySelectorAll('.layoutContent-main .list-item'),
    ].map((elPost) => getContent(elPost));

    return { posts: postsData };
  }
}

export default new GizModo();
