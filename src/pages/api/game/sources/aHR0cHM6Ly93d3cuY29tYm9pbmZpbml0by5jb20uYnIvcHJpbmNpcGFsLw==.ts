import { JSDOM } from "jsdom";
import { ISource, IResponseHomeDTO } from ".";

class C0mb0 implements ISource {
  getOriginUrl(): string {
    return atob("aHR0cHM6Ly93d3cuY29tYm9pbmZpbml0by5jb20uYnIvcHJpbmNpcGFsLw==");
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    const replaceSpaces = (text: string) => {
      return text
        .replace(/\n|\r|\t/g, "")
        .replace(/\n|\s{2,}/g, "")
        .replace(/\\n|\\r|\\t/g, "")
        .replace(/\s{2,}/g, "");
    };

    const getContent = (elPost: Element) => {
      return {
        link: elPost
          .querySelector(".elementor-post__title a")
          ?.getAttribute("href"),
        title: replaceSpaces(
          String(elPost.querySelector(".elementor-post__title a")?.textContent),
        ),
        thumb: elPost.querySelector("img")?.getAttribute("data-src"),
        created_at: replaceSpaces(
          String(elPost.querySelector(".elementor-post-date")?.textContent),
        ),
      };
    };

    const postsData = [
      ...document.querySelectorAll(".elementor-posts .elementor-post"),
    ]
      .map((elPost) => getContent(elPost))
      .filter((elPost) => elPost.thumb && elPost.title != "undefined");

    return { posts: [...postsData] };
  }
}

export default new C0mb0();
