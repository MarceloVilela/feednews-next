import { JSDOM } from "jsdom";
import IResponseHomeDTO from ".";

class C0c4t {
  getOriginUrl(): string {
    return atob("aHR0cHM6Ly9jb2NhdGVjaC5jb20uYnI=");
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    const getContent = (elPost: Element) => {
      return {
        link: elPost.querySelector("a")?.getAttribute("href"),
        title: elPost.querySelector("h2")?.textContent,
        thumb: elPost
          .querySelector('div[class="slide"]')
          ?.getAttribute("style")
          ?.split("(")[1]
          ?.split(")")[0],
        created_at: elPost.querySelector(".thumb-meta")?.textContent,
      };
    };

    const postsData = [
      ...document.querySelectorAll(".container-wrapper.post-element"),
    ].map((elPost) => getContent(elPost));

    return { posts: postsData };
  }
}

export default new C0c4t();
