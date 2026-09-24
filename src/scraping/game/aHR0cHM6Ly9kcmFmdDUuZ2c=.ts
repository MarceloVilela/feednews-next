//import axios from 'axios';
import { JSDOM } from "jsdom";
import { ISource, IResponseHomeDTO } from ".";

class Dr4ft implements ISource {
  getOriginUrl(): string {
    return atob("aHR0cHM6Ly9kcmFmdDUuZ2c=");
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    const getThumb = (elPost: Element) => {
      const src = elPost
        .querySelector("img[src*='/_next/image']")
        ?.getAttribute("src");
      return src
        ? (new URL(src, this.getOriginUrl()).searchParams.get("url") ??
            undefined)
        : undefined;
    };

    const getContent = (elPost: Element) => {
      return {
        link: this.getOriginUrl() + elPost.getAttribute("href"),
        title: elPost.querySelector("[class*='__title']")?.textContent?.trim(),
        thumb: getThumb(elPost),
        created_at: "",
      };
    };

    const postsData = [
      ...new Map(
        [...document.querySelectorAll("a[href^='/noticia/']")]
          .map((elPost) => getContent(elPost))
          .filter((elPost) => elPost.thumb && elPost.title)
          .map((post) => [post.link, post] as const),
      ).values(),
    ];

    return { posts: [...postsData] };
  }
}

export default new Dr4ft();
