import { JSDOM } from "jsdom";
import { ISource, IResponseHomeDTO } from ".";

class J0v3m implements ISource {
  getOriginUrl(): string {
    return atob("aHR0cHM6Ly9qb3ZlbW5lcmQuY29tLmJy");
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    const replaceSpaces = (text: string) => {
      return text
        .replace(/\n|\r|\t/g, "")
        .replace(/\n|\s{2,}/g, "")
        .replace(/\\n|\\r|\\t/g, "")
        .replace(/\s{2,}/g, "");
    };

    const getContent = (elPost: Element) => {
      return {
        link: this.getOriginUrl() + elPost?.getAttribute("href"),
        title: elPost.querySelector("img")?.getAttribute("alt"),
        thumb: elPost.querySelector("img")?.getAttribute("src"),
        created_at: "",
      };
    };

    const postsData = [...document.querySelectorAll(".flex-col a[aria-label]")]
      .map((elPost) => getContent(elPost))
      .filter(
        (elPost) =>
          elPost.thumb &&
          elPost.title != "undefined" &&
          !elPost.link.includes("autor"),
      );

    return { posts: [...postsData] };
  }
}

export default new J0v3m();
