import { JSDOM } from "jsdom";
import IResponseHomeDTO from ".";

class T3cmu {
  getOriginUrl(): string {
    return atob("aHR0cHM6Ly93d3cudGVjbXVuZG8uY29tLmJy");
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(url);
    const { document } = response.window;

    const getContent = (elPost: Element) => {
      const elLink = elPost.querySelector("h2.headline")?.closest("a");
      const elImg = elPost.querySelector("img");

      return {
        link: elLink?.getAttribute("href"),
        title: elLink?.getAttribute("title"),
        thumb: elImg?.getAttribute("data-src") ?? elImg?.getAttribute("src"),
        // preview: '',
        created_at: undefined,
      };
    };

    const postsData = [...document.querySelectorAll(".news-block")]
      .map((elPost) => getContent(elPost))
      .filter(({ link, thumb }) => link && thumb);

    return { posts: postsData };
  }
}

export default new T3cmu();
