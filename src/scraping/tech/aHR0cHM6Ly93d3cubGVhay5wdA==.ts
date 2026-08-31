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
        link: elPost.querySelector("h3 a")?.getAttribute("href"),
        title: elPost
          .querySelector("h3")
          ?.textContent.replace(/\n/g, "")
          .trim(),
        thumb: elPost.querySelector("img[src]")?.getAttribute("src"),
        created_at: elPost.querySelector(".jeg_meta_date")?.textContent,
      };
    };

    const postsData = [...document.querySelectorAll("article")]
      .map((elPost) => getContent(elPost))
      .filter(
        (elPost) => elPost.thumb && elPost.title && elPost.title != "undefined",
      );

    return { posts: postsData };
  }
}

export default new L34k();
