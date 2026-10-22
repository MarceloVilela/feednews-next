import { JSDOM } from "jsdom";
import IResponseHomeDTO from ".";

class L34k {
  getOriginUrl(): string {
    return atob("aHR0cHM6Ly93d3cubGVhay5wdA==");
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    const getContent = (elPost: Element) => {
      return {
        link: elPost.getAttribute("href"),
        title: elPost
          .querySelector("h3.lk-t")
          ?.textContent.replace(/\n/g, "")
          .trim(),
        thumb: elPost.querySelector("img[src]")?.getAttribute("src"),
        created_at: elPost.querySelector(".lk-meta")?.lastChild?.textContent,
      };
    };

    const postsData = [...document.querySelectorAll("a.lk-card")]
      .map((elPost) => getContent(elPost))
      .filter(
        (elPost) => elPost.thumb && elPost.title && elPost.title != "undefined",
      );

    return { posts: postsData };
  }
}

export default new L34k();
