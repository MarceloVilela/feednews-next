import { JSDOM } from "jsdom";
import IResponseHomeDTO from ".";

class T3chT {
  getOriginUrl(): string {
    return atob("aHR0cHM6Ly93d3cudGVjaHR1ZG8uY29tLmJy");
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    const getContent = (elPost: Element) => {
      return {
        link: elPost
          .querySelector(".theme-title-element a")
          ?.getAttribute("href"),
        title: elPost.querySelector(".theme-title-element")?.textContent,
        thumb: elPost.querySelector("img")?.getAttribute("src")?.split(" ")[0],
        created_at: elPost.querySelector(".feed-post-datetime")?.textContent,
      };
    };

    const postsData = [...document.querySelectorAll(".grid-x .cell")]
      .map((elPost) => getContent(elPost))
      .filter(({ link }) => link?.includes(this.getOriginUrl()));

    return { posts: postsData };
  }
}

export default new T3chT();
