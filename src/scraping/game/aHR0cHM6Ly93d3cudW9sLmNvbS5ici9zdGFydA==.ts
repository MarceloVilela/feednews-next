import { JSDOM } from "jsdom";
import { ISource, IResponseHomeDTO } from ".";

class St4rt implements ISource {
  getOriginUrl(): string {
    return atob("aHR0cHM6Ly93d3cudW9sLmNvbS5ici9zdGFydA==");
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
        link: `${url}${elPost.querySelector("a")?.getAttribute("href")}`,
        title: replaceSpaces(String(elPost.querySelector("a")?.textContent)),
        thumb: elPost.querySelector("[data-src]")?.getAttribute("data-src"),
        created_at: "",
      };
    };

    const postsData = [...document.querySelectorAll(".thumbnails-item")].map(
      (elPost) => getContent(elPost),
    );
    //.filter((elPost) => (elPost.thumb && elPost.title != "undefined"));

    return { posts: [...postsData] };
  }
}

export default new St4rt();
