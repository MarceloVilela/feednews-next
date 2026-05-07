//import axios from 'axios';
import { JSDOM } from "jsdom";
import { ISource, IResponseHomeDTO } from ".";

class Dr4ft implements ISource {
  getOriginUrl(): string {
    return atob("aHR0cHM6Ly9kcmFmdDUuZ2c=");
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    const getContent = (elPost: Element) => {
      return {
        link:
          this.getOriginUrl() + elPost.querySelector("a")?.getAttribute("href"),
        title: String(elPost.querySelector("h2")?.textContent),
        thumb:
          this.getOriginUrl() +
          elPost
            .querySelector("[srcSet]")
            ?.getAttribute("srcSet")
            ?.split(" ")[0],
        created_at: "",
      };
    };

    const postsData = [
      ...document.querySelectorAll("div[class^='Card__CardContainer']"),
    ]
      .map((elPost) => getContent(elPost))
      .filter((elPost) => elPost.thumb && elPost.title != "undefined");

    return { posts: [...postsData] };
  }
}

export default new Dr4ft();
