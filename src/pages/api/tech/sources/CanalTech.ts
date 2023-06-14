import { JSDOM } from 'jsdom';
import IResponseHomeDTO from '.';

class CanalTech {
  getOriginUrl(): string {
    return 'https://canaltech.com.br';
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    const getContent = (elPost: Element) => {
      return {
        link: `${url}${elPost.querySelector('a')?.getAttribute('href')}`,
        title: elPost.querySelector('h3')?.textContent,
        thumb:
          elPost.querySelector('img')?.getAttribute('src') ??
          this.getOriginUrl() +
            document
              .querySelector('link[rel="apple-touch-icon"]')
              ?.getAttribute('href'),
        created_at: '',
      };
    };

    const postsData = [
      ...document.querySelectorAll('.swiper-wrapper .swiper-slide'),
    ].map((elPost) => getContent(elPost));

    return { posts: postsData };
  }
}

export default new CanalTech();
