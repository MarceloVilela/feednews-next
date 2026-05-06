import { JSDOM } from "jsdom";
import IResponseHomeDTO from ".";

class M41sT {
  getOriginUrl(): string {
    return atob("aHR0cHM6Ly93d3cubWFpc3RlY25vbG9naWEuY29t");
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    const getContent = (elPost: Element) => {
      return {
        link: elPost.querySelector(".post-title a")?.getAttribute("href"),
        title: elPost
          .querySelector(".post-title")
          ?.textContent.replace(/\\n/g, "")
          .trim(),
        thumb: elPost
          .querySelector("img")
          ?.getAttribute("data-lazy-srcset")
          ?.split(" ")[0],
        created_at: "",
      };
    };

    const postsData = [...document.querySelectorAll(".post-item")]
      .map((elPost) => getContent(elPost))
      .filter(
        (elPost) => elPost.thumb && elPost.title && elPost.title != "undefined",
      );

    return { posts: postsData };
  }
}

export default new M41sT();
