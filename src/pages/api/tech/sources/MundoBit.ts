import { JSDOM } from "jsdom";
import IResponseHomeDTO from ".";

class MundoBit {
  getOriginUrl(): string {
    return "https://blogs.ne10.uol.com.br/mundobit/";
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    const getContent = (elPost: Element) => {
      return {
        link: elPost.querySelector("a")?.getAttribute("href"),
        title: elPost.querySelector("h1")?.textContent,
        thumb: elPost.querySelector("figure img")?.getAttribute("src"),
        created_at: elPost
          .querySelector("h1+a")
          ?.textContent?.split(" ")
          ?.pop(),
      };
    };

    const postsData = [...document.querySelectorAll("article")].map((elPost) =>
      getContent(elPost),
    );

    return { posts: postsData };
  }
}

export default new MundoBit();
