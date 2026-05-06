import { JSDOM } from "jsdom";
import { ISource, IResponseHomeDTO } from ".";

class Espn implements ISource {
  getOriginUrl(): string {
    return "https://www.espn.com.br/esports";
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
        link: `https://www.espn.com.br${elPost.querySelector("a")?.getAttribute("href")}`,
        title: replaceSpaces(
          String(elPost.querySelector(".contentItem__title")?.textContent),
        ),
        thumb: elPost
          .querySelector("source")
          ?.getAttribute("data-srcset")
          ?.split(" ")[0],
        created_at: "",
      };
    };

    const postsData = [...document.querySelectorAll("article.contentItem")]
      .map((elPost) => getContent(elPost))
      .filter((elPost) => elPost.thumb && elPost.title != "undefined");

    return { posts: [...postsData] };
  }
}

export default new Espn();
