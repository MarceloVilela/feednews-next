import { JSDOM } from "jsdom";
import IResponseHomeDTO from ".";

class MaisTecnologia {
  getOriginUrl(): string {
    return "https://www.maistecnologia.com";
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    const getContent = (elPost: Element) => {
      return {
        link: elPost.querySelector("h3 a")?.getAttribute("href"),
        title: elPost.querySelector("h3 a")?.textContent,
        thumb: elPost.querySelector("img")?.getAttribute("data-fpo-src"),
        created_at: "",
      };
    };

    const postsData = [...document.querySelectorAll(".td_module_wrap")]
      .map((elPost) => getContent(elPost))
      .filter(
        (elPost) => elPost.thumb && elPost.title && elPost.title != "undefined"
      );

    return { posts: postsData };
  }
}

export default new MaisTecnologia();
