import { JSDOM } from "jsdom";
import { ISource, IResponseHomeDTO } from ".";

class TheClutch implements ISource {
  getOriginUrl(): string {
    return "https://theclutch.com.br";
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}/esports`);
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
        link: `${elPost.querySelector("a")?.getAttribute("href")}`,
        title: replaceSpaces(String(elPost.querySelector("h2")?.textContent)),
        thumb: elPost.querySelector("img[src]")?.getAttribute("data-src"),
        created_at: "",
      };
    };

    const postsData = [...document.querySelectorAll("article.type-post")]
      .map((elPost) => getContent(elPost))
      .filter((elPost) => elPost.thumb && elPost.title != "undefined");

    return { posts: [...postsData] };
  }
}

export default new TheClutch();
