import { JSDOM } from "jsdom";
import IResponseHomeDTO from ".";

class Tecmundo {
  getOriginUrl(): string {
    return "https://www.tecmundo.com.br";
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(url);
    const { document } = response.window;

    const getContent = (elPost: Element) => ({
      link:
        this.getOriginUrl() +
        elPost.querySelector("a[title]")?.getAttribute("href"),
      title: elPost.querySelector("a[title]")?.getAttribute("title"),
      thumb: elPost.querySelector("img")?.getAttribute("src"),
      // preview: '',
      created_at: elPost.querySelector(".tec--timestamp__item")?.textContent,
    });

    const postsData = [...document.querySelectorAll("article")].map((elPost) =>
      getContent(elPost),
    );

    return { posts: postsData };
  }
}

export default new Tecmundo();
