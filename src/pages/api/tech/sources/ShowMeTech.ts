import { JSDOM } from "jsdom";
import IResponseHomeDTO from ".";
import { title } from "node:process";

class ShowMeTech {
  getOriginUrl(): string {
    return "https://www.showmetech.com.br";
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    const getContent = (elPost: Element) => {
      return {
        link: elPost.querySelector("h2 a")?.getAttribute("href"),
        title: elPost.querySelector("h2 a")?.textContent,
        thumb: elPost
          .querySelector("img")
          ?.getAttribute("data-lazy-srcset")
          ?.split(" ")[0],
        created_at: "",
      };
    };

    const postsData = [...document.querySelectorAll("article.type-post")]
      .map((elPost) => getContent(elPost))
      .filter((item) => item.thumb && item.title);

    return { posts: postsData };
  }
}

export default new ShowMeTech();
