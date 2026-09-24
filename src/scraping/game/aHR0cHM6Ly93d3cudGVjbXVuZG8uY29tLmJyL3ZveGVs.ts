import { JSDOM } from "jsdom";
import { ISource, IResponseHomeDTO } from ".";

class V0x3l implements ISource {
  getOriginUrl(): string {
    return atob("aHR0cHM6Ly93d3cudGVjbXVuZG8uY29tLmJyL3ZveGVs");
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    const getContent = (elPost: Element) => {
      const elLink = elPost.querySelector("h2.headline")?.closest("a");

      const elImg = elPost.querySelector("img");

      return {
        link: elLink?.getAttribute("href"),
        title: elPost.querySelector("h2.headline")?.textContent?.trim(),
        thumb: elImg?.getAttribute("data-src") ?? elImg?.getAttribute("src"),
        created_at: undefined,
      };
    };

    const postsData = [...document.querySelectorAll(".news-block")]
      .map((elPost) => getContent(elPost))
      .filter((elPost) => elPost.link && elPost.thumb && elPost.title);

    return { posts: [...postsData] };
  }
}

export default new V0x3l();
