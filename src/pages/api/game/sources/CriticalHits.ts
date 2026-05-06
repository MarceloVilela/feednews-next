import { JSDOM } from "jsdom";
import { ISource, IResponseHomeDTO } from ".";

class CriticalHits implements ISource {
  getOriginUrl(): string {
    return "https://criticalhits.com.br/";
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
        link: elPost.querySelector(".td-module-title a")?.getAttribute("href"),
        title: replaceSpaces(
          String(elPost.querySelector(".td-module-title a")?.textContent),
        ),
        thumb: elPost
          .querySelector("[data-img-url]")
          ?.getAttribute("data-img-url"),
        created_at: replaceSpaces(
          String(elPost.querySelector(".td-module-date")?.textContent),
        ),
      };
    };

    const postsData = [...document.querySelectorAll(".td-category-pos-")]
      .map((elPost) => getContent(elPost))
      .filter((elPost) => elPost.thumb && elPost.title != "undefined");

    return { posts: [...postsData] };
  }
}

export default new CriticalHits();
