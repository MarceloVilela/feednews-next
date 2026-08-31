import { JSDOM } from "jsdom";
import IResponseHomeDTO from ".";

class F0urG {
  getOriginUrl(): string {
    return atob("aHR0cHM6Ly80Z25ld3MucHQ=");
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    const getContent = (elPost: Element) => {
      return {
        link: this.getOriginUrl() + elPost.getAttribute("href"),
        title: elPost.querySelector(".post-title")?.textContent,
        thumb: elPost.querySelector(".post-img img")?.getAttribute("src"),
        created_at: elPost.querySelector("time")?.getAttribute("datetime"),
      };
    };

    const postsData = [...document.querySelectorAll(".list-articles-item")].map(
      (elPost) => getContent(elPost),
    );

    return { posts: postsData };
  }
}

export default new F0urG();
