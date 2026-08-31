import { JSDOM } from "jsdom";
import IResponseHomeDTO from ".";

class T1lt {
  getOriginUrl(): string {
    return atob("aHR0cHM6Ly93d3cudW9sLmNvbS5ici90aWx0");
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    const getContent = (elPost: Element) => {
      return {
        link: elPost.querySelector("a")?.getAttribute("href"),
        title: elPost.querySelector("h3")?.textContent,
        thumb: elPost.querySelector("img")?.getAttribute("data-src"),
        created_at: "",
      };
    };

    const postsData = [...document.querySelectorAll(".thumbnails-wrapper")]
      .map((elPost) => getContent(elPost))
      .filter(
        ({ thumb, link }) =>
          thumb?.includes("http") && link?.includes(this.getOriginUrl()),
      );

    return { posts: postsData };
  }
}

export default new T1lt();
