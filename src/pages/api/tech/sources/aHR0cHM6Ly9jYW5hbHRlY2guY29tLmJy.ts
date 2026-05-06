import { JSDOM } from "jsdom";
import IResponseHomeDTO from ".";

class C4n4l {
  getOriginUrl(): string {
    return atob("aHR0cHM6Ly9jYW5hbHRlY2guY29tLmJy");
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

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

export default new C4n4l();
