import { JSDOM } from "jsdom";
import { ISource, IResponseHomeDTO } from ".";

class XbW1r implements ISource {
  getOriginUrl(): string {
    return atob("aHR0cHM6Ly9uZXdzLnhib3guY29tL3B0LWJy");
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
        link: elPost.querySelector("h2 a")?.getAttribute("href")
          ? elPost.querySelector("h2 a")?.getAttribute("href")
          : elPost.querySelector("h3 a")?.getAttribute("href"),
        title: elPost.querySelector("h2 a")?.textContent
          ? elPost.querySelector("h2 a")?.textContent
          : elPost.querySelector("h3 a")?.textContent,
        thumb: elPost.querySelector("img")?.getAttribute("src"),
        created_at: replaceSpaces(
          String(elPost.querySelector(".elementor-post-date")?.textContent),
        ),
      };
    };

    const postsData = [
      ...document.querySelectorAll(".wp-block-columns article"),
    ].map((elPost) => getContent(elPost));
    //.filter((elPost) => elPost.thumb && elPost.title != "undefined");

    return { posts: [...postsData] };
  }
}

export default new XbW1r();
