import { JSDOM } from "jsdom";
import { ISource, IResponseHomeDTO } from ".";

class ArenaXbox implements ISource {
  getOriginUrl(): string {
    return "https://arenaxbox.com.br";
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
        title: replaceSpaces(
          String(elPost.querySelector("a")?.getAttribute("title")),
        ),
        thumb: elPost.querySelector(".entry-thumb")?.getAttribute("data-back"),
        created_at: "",
      };
    };

    const postsData = [...document.querySelectorAll(".td-cpt-post")]
      .map((elPost) => getContent(elPost))
      .filter((elPost) => elPost.thumb && elPost.title != "undefined");

    return { posts: [...postsData] };
  }
}

export default new ArenaXbox();
