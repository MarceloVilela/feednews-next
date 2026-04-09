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

    fs.writeFileSync(
      "./tudoemtecnologia.html",
      String(document.querySelector("html")?.innerHTML)
    );

    const getContent = (elPost: Element) => {
      return {
        link: elPost?.querySelector("a")?.getAttribute("href"),
        title: elPost?.querySelector(".elementor-heading-title")?.textContent,
        thumb: elPost.querySelector(".lazyloaded")?.getAttribute("data-src"),
        //?.getAttribute("data-orig-file"),
        created_at: "",
      };
    };

    const postsData = [
      ...document.querySelectorAll(".elementor-grid .post"),
    ].map((elPost) => getContent(elPost));

    return { posts: postsData };
  }
}

export default new TudoEmTecnologia();
