import { JSDOM } from "jsdom";
import IResponseHomeDTO from ".";
import fs from "fs";

class TudoEmTecnologia {
  getOriginUrl(): string {
    return "https://tudoemtecnologia.com/categoria/noticias/";
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl(); //+ "/categoria/noticias/";
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    const getContent = (elPost: Element) => {
      return {
        link: elPost?.querySelector("a")?.getAttribute("href"),
        title:
          elPost?.querySelector("h3")?.innerText ??
          elPost
            ?.querySelector("a")
            ?.textContent.replaceAll(/\n|\r|\t/g, "")
            .trim()
            ?.match(/[A-Z].*/)?.[0],
        thumb: elPost
          .querySelector("img")
          ?.getAttribute("srcset")
          ?.split(" ")[0]
          .trim(),
        //?.getAttribute("data-orig-file"),
        created_at: "",
      };
    };

    const postsData = [...document.querySelectorAll(".post.type-post")]
      .map((elPost) => getContent(elPost))
      .filter((elPost) => elPost.thumb && elPost.title != "undefined");

    return { posts: postsData };
  }
}

export default new TudoEmTecnologia();
