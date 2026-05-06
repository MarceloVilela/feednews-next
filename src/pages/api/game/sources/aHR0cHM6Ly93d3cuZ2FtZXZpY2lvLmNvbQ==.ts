import { JSDOM } from "jsdom";
import { ISource, IResponseHomeDTO } from ".";

class G4m3V implements ISource {
  getOriginUrl(): string {
    return atob("aHR0cHM6Ly93d3cuZ2FtZXZpY2lvLmNvbQ==");
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
        link: elPost.querySelector("h2 a")?.getAttribute("href"),
        title: replaceSpaces(String(elPost.querySelector("h2 a")?.textContent)),
        thumb: elPost.querySelector("img")?.getAttribute("data-lazy-src"),
        created_at: replaceSpaces(
          String(elPost.querySelector(".elementor-post-date")?.textContent),
        ),
      };
    };

    const postsData = [
      ...document.querySelectorAll(".elementor-loop-container .post.type-post"),
    ]
      .map((elPost) => getContent(elPost))
      .filter((elPost) => elPost.thumb && elPost.title != "undefined");

    return { posts: [...postsData] };
  }
}

export default new G4m3V();
