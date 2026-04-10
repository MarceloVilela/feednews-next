import { JSDOM } from "jsdom";
import IResponseHomeDTO from ".";
//import fs from "fs";

class Leak {
  getOriginUrl(): string {
    return "https://www.leak.pt";
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    //fs.writeFileSync("./leak.html", String(document.querySelector("html")?.innerHTML));

    const getContent = (elPost: Element) => {
      return {
        link: elPost.querySelector("h3 a")?.getAttribute("href"),
        title: elPost
          .querySelector("h3")
          ?.textContent.replace(/\n/g, "")
          .trim(),
        thumb: elPost.querySelector("[data-src]")?.getAttribute("data-src"),
        created_at: elPost.querySelector(".jeg_meta_date")?.textContent,
      };
    };

    const postsData = [...document.querySelectorAll("article")]
      .map((elPost) => getContent(elPost))
      .filter(
        (elPost) => elPost.thumb && elPost.title && elPost.title != "undefined",
      );

    return { posts: postsData };
  }
}

export default new Leak();
