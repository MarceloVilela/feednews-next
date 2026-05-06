import { JSDOM } from "jsdom";
import { ISource, IResponseHomeDTO } from ".";

class Ar3n4 implements ISource {
  getOriginUrl(): string {
    return atob("aHR0cHM6Ly9hcmVuYXhib3guY29tLmJy");
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

export default new Ar3n4();
