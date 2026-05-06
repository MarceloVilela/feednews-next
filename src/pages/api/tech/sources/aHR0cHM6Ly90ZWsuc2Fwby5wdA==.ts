import { JSDOM } from "jsdom";
import IResponseHomeDTO from ".";

class S4p0 {
  getOriginUrl(): string {
    return atob("aHR0cHM6Ly90ZWsuc2Fwby5wdA==");
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    const getContent = (elPost: Element) => {
      return {
        link: `${elPost?.querySelector("a")?.getAttribute("href")}`,
        title: elPost?.querySelector("img")?.getAttribute("alt"),
        thumb: `${elPost.querySelector("img")?.getAttribute("srcset")?.split(" ")[0].trim()}`,
        created_at:
          elPost.querySelector("datetime")?.getAttribute("datetime") || "",
      };
    };

    const postsData = [...document.querySelectorAll("article")]
      .map((elPost) => getContent(elPost))
      .filter(
        (elPost) =>
          elPost.thumb &&
          elPost.title &&
          elPost.thumb != "undefined" &&
          elPost.title != "undefined",
      );

    return { posts: postsData };
  }
}

export default new S4p0();
