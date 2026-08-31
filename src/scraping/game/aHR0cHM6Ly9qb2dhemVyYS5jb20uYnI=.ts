import { JSDOM } from "jsdom";
import { ISource, IResponseHomeDTO } from ".";

class J0g4Z implements ISource {
  getOriginUrl(): string {
    return atob("aHR0cHM6Ly9qb2dhemVyYS5jb20uYnI=");
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
          String(elPost.querySelector(".title")?.textContent),
        ),
        thumb: elPost.querySelector("img[src]")?.getAttribute("src"),
        created_at: "",
      };
    };

    const postsData = [...document.querySelectorAll("article")]
      .map((elPost) => getContent(elPost))
      .filter((elPost) => elPost.thumb && elPost.title != "undefined");

    return { posts: [...postsData] };
  }
}

export default new J0g4Z();
