import { JSDOM } from "jsdom";
import { ISource, IResponseHomeDTO } from ".";

class P0rt4 implements ISource {
  getOriginUrl(): string {
    return atob("aHR0cHM6Ly92aWNpYWRvcy5uZXQ=");
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
        link: elPost.querySelector("h4 a")?.getAttribute("href"),
        title: replaceSpaces(String(elPost.querySelector("h4 a")?.textContent)),
        thumb: elPost.querySelector("[data-src]")?.getAttribute("data-src"),
        created_at: replaceSpaces(
          String(
            elPost.querySelector(".home-hero-meta")?.textContent.split("•")[1],
          ),
        ),
      };
    };

    const postsData = [...document.querySelectorAll("article.vgdb-post-card")]
      .map((elPost) => getContent(elPost))
      .filter((elPost) => elPost.thumb && elPost.title != "undefined");

    return { posts: [...postsData] };
  }
}

export default new P0rt4();
