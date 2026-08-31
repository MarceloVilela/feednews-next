import axios from "axios";
import { JSDOM } from "jsdom";
import { ISource, IResponseHomeDTO } from ".";

class M4is3 implements ISource {
  getOriginUrl(): string {
    return atob("aHR0cHM6Ly9tYWlzZXNwb3J0cy5jb20uYnI=");
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}/noticias`);
    const { document } = response.window;

    const replaceSpaces = (text: string) => {
      return text
        .replace(/\n|\r|\t/g, "")
        .replace(/\n|\s{2,}/g, "")
        .replace(/\\n|\\r|\\t/g, "")
        .replace(/\s{2,}/g, "");
    };

    const getContent = (elPost: Element) => {
      const urlImg = String(
        this.getOriginUrl() +
          elPost
            .querySelector("[srcSet]")
            ?.getAttribute("srcSet")
            ?.split(" ")[0],
      );
      const urlParams = new URL(urlImg, this.getOriginUrl());
      const encodedUrl = urlParams.searchParams.get("url") || "";
      const finalUrl = decodeURIComponent(encodedUrl);
      return {
        link: `${url}/${elPost.getAttribute("href")}`,
        title: replaceSpaces(
          String(elPost.querySelector("img")?.getAttribute("alt")),
        ),
        thumb: finalUrl,
        created_at: "",
      };
    };

    const postsData = [...document.querySelectorAll("section + .grid a")]
      .map((elPost) => getContent(elPost))
      .filter((elPost) => elPost.thumb && elPost.title != "undefined");

    return { posts: [...postsData] };
  }
}

export default new M4is3();
