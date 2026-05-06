import { JSDOM } from "jsdom";
import { ISource, IResponseHomeDTO } from ".";

class G1g4m implements ISource {
  getOriginUrl(): string {
    return atob("aHR0cHM6Ly9nMS5nbG9iby5jb20vcG9wLWFydGUvZ2FtZXM=");
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
        title: replaceSpaces(String(elPost.querySelector("h2")?.textContent)),
        thumb: elPost
          .querySelector("img")
          ?.getAttribute("srcSet")
          ?.split(" ")[0],
        created_at: "",
      };
    };

    const postsData = [...document.querySelectorAll(".bastian-feed-item")]
      .map((elPost) => getContent(elPost))
      .filter((elPost) => elPost.thumb && elPost.title != "undefined");

    return { posts: [...postsData] };
  }
}

export default new G1g4m();
