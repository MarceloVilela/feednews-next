import { JSDOM } from "jsdom";
import { ISource, IResponseHomeDTO } from ".";

class W1nd0 implements ISource {
  getOriginUrl(): string {
    return atob("aHR0cHM6Ly93aW5kb3dzY2x1Yi5jb20uYnI=");
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
        link: elPost.querySelector(".entry-title a")?.getAttribute("href"),
        title: replaceSpaces(
          String(elPost.querySelector(".entry-title a")?.textContent),
        ),
        thumb: elPost.querySelector("img")?.getAttribute("src"),
        created_at: "",
      };
    };

    const postsData = [...document.querySelectorAll(".posts-layout article")]
      .map((elPost) => getContent(elPost))
      .filter((elPost) => elPost.thumb && elPost.title != "undefined");

    return { posts: [...postsData] };
  }
}

export default new W1nd0();
