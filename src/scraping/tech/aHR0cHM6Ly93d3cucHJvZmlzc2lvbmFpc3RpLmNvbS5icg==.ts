import { JSDOM } from "jsdom";
import IResponseHomeDTO from ".";

class Pr0f1 {
  getOriginUrl(): string {
    return atob("aHR0cHM6Ly93d3cucHJvZmlzc2lvbmFpc3RpLmNvbS5icg==");
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    const getContent = (elPost: Element) => {
      return {
        link: elPost.querySelector("a")?.getAttribute("href"),
        title: elPost.querySelector("h2")?.textContent,
        thumb: elPost.querySelector("img.post_thumbnail")?.getAttribute("src"),
        created_at: elPost.querySelector("date")?.textContent,
      };
    };

    const postsData = [...document.querySelectorAll("#content article")]
      .map((elPost) => getContent(elPost))
      .filter(({ title }) => !!title);

    return { posts: postsData };
  }
}

export default new Pr0f1();
