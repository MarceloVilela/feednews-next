import { JSDOM } from "jsdom";
import IResponseHomeDTO from ".";

class Olh4r {
  getOriginUrl() {
    return atob("aHR0cHM6Ly9vbGhhcmRpZ2l0YWwuY29tLmJy");
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    const getContent = (elPost: Element) => ({
      link: elPost.getAttribute("href"),
      title: elPost.querySelector("h3")?.textContent,
      thumb: elPost.querySelector("img")?.getAttribute("src"),
      // preview: '',
      created_at: "",
    });

    const postsData = [
      ...document.querySelectorAll(".pbl-noticias-feed .pbl-noticias-item"),
    ]
      .map((elPost) => getContent(elPost))
      .filter((elPost: any) => elPost.link.includes(url));

    return { posts: postsData };
  }
}

export default new Olh4r();
