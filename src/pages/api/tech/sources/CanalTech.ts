import { JSDOM } from "jsdom";
import IResponseHomeDTO from ".";
import fs from "fs";

class CanalTech {
  getOriginUrl(): string {
    return "https://canaltech.com.br";
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    //fs.writeFileSync("./canaltech.html", String(document.querySelector("html")?.innerHTML));

    const getContent = (elPost: Element) => {
      return {
        link:
          this.getOriginUrl() + elPost.querySelector("a")?.getAttribute("href"),
        title: elPost.querySelector("h3")?.textContent,
        thumb: elPost.querySelector("img")?.getAttribute("src"),
        // preview: '',
        created_at: "",
      };
    };

    const postsData = [...document.querySelectorAll("article")]
      .map((elPost) => getContent(elPost))
      .filter((elPost: any) => elPost.thumb && elPost.title != "undefined");

    return { posts: postsData };
  }
}

export default new CanalTech();
