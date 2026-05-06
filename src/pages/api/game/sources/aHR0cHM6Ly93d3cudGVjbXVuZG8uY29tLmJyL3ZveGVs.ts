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
      return {
        link:
          atob("aHR0cHM6Ly93d3cudGVjbXVuZG8uY29tLmJy") +
          elPost.querySelector("a")?.getAttribute("href"),
        title: elPost.querySelector("h3")?.textContent,
        thumb: elPost.querySelector("img")?.getAttribute("src"),
        created_at: elPost.querySelector(".tec--timestamp")?.textContent,
      };
    };

    const postsData = [
      ...document.querySelectorAll(".grid-cols-1 article"),
    ].map((elPost) => getContent(elPost));

    return { posts: [...postsData] };
  }
}

export default new V0x3l();
