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
        link: elPost.querySelector('a')?.getAttribute('href'),
        title: elPost.querySelector('h3')?.textContent,
        thumb: elPost
          .querySelector('figure img')
          ?.getAttribute('src'),
        // preview: '',
        created_at: '',
      };
    };

    console.table(['total', [...document.querySelectorAll('article')].length])

    const postsData = [...document.querySelectorAll('article')]
      .map((elPost) => getContent(elPost));

    return { posts: postsData };
  }
}

export default new CanalTech();
