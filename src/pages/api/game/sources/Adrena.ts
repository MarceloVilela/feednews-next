import { JSDOM } from "jsdom";
import { ISource, IResponseHomeDTO } from ".";

class Adrena implements ISource {
  getOriginUrl(): string {
    return "https://www.adrenaline.com.br/games";
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
        link: elPost.querySelector("a")?.getAttribute("href"),
        title: elPost.querySelector("a")?.getAttribute("title"),
        thumb: String(
          elPost.querySelector("img")?.getAttribute("data-srcset"),
        ).split(" ")[0],
        created_at: "",
      };
    };

    const postsData = [
      ...document.querySelectorAll(".archive-list-posts article"),
    ]
      .map((elPost) => getContent(elPost))
      .filter(
        (elPost) =>
          elPost.thumb != "" &&
          elPost.thumb != "null" &&
          elPost.title != "undefined",
      );

    return { posts: [...postsData] };
  }
}

export default new Adrena();
