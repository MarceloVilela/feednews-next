import { JSDOM } from "jsdom";
import { ISource, IResponseHomeDTO } from ".";

class BrPsx implements ISource {
  getOriginUrl(): string {
    return atob("aHR0cHM6Ly9wc3hicmFzaWwuY29tLmJyLw==");
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
        link: elPost.querySelector(".post-title a")?.getAttribute("href"),
        title: replaceSpaces(
          String(elPost.querySelector(".post-title a")?.textContent),
        ),
        thumb: elPost.querySelector("img")?.getAttribute("data-src"),
        created_at: "",
      };
    };

    const postsData = [...document.querySelectorAll(".posts-items .post-item")]
      .map((elPost) => getContent(elPost))
      .filter((elPost) => elPost.thumb && elPost.title != "undefined");

    return { posts: [...postsData] };
  }
}

export default new BrPsx();
