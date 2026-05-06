import { JSDOM } from "jsdom";
import { ISource, IResponseHomeDTO } from ".";

class IgnBr implements ISource {
  getOriginUrl(): string {
    return "https://br.ign.com";
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
        link: elPost.querySelector("h3 a")?.getAttribute("href"),
        title: replaceSpaces(String(elPost.querySelector("h3 a")?.textContent)),
        thumb: elPost.querySelector("img")?.getAttribute("data-src"),
        created_at: "",
      };
    };

    const postsData = [...document.querySelectorAll(".tbl article")]
      .map((elPost) => getContent(elPost))
      .filter(
        (elPost) =>
          elPost.thumb &&
          elPost.thumb != "null" &&
          elPost.title &&
          elPost.title != "undefined",
      );

    const getDataContent = (elPost: Element) => {
      return {
        link: `${url}${elPost.querySelector("a")?.getAttribute("href")}`,
        title: replaceSpaces(String(elPost.querySelector("a")?.textContent)),
        thumb: String(elPost.querySelector("img")?.getAttribute("data-src")),
        created_at: "",
      };
    };

    const cardsData = [...document.querySelectorAll(".wrap article")]
      .map((elPost) => getDataContent(elPost))
      .filter(
        (elPost) =>
          elPost.thumb &&
          elPost.thumb != "null" &&
          elPost.title &&
          elPost.title != "undefined",
      );

    return { posts: [...cardsData, ...postsData] };
  }
}

export default new IgnBr();
