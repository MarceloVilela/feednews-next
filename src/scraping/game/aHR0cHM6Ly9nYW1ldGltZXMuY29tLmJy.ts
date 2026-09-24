import { JSDOM } from "jsdom";
import { ISource, IResponseHomeDTO } from ".";

class G4m3T implements ISource {
  getOriginUrl(): string {
    return atob("aHR0cHM6Ly9nYW1ldGltZXMuY29tLmJy");
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    const getThumb = (elPost: Element) => {
      const src = elPost.querySelector("img")?.getAttribute("src");
      return src
        ? (new URL(src, url).searchParams.get("url") ?? undefined)
        : undefined;
    };

    const getContent = (elPost: Element) => {
      return {
        link: `${url}${elPost.querySelector("a")?.getAttribute("href")}`,
        title: elPost.querySelector("h2, h3")?.textContent?.trim(),
        thumb: getThumb(elPost),
        created_at: "",
      };
    };

    const postsData = [...document.querySelectorAll("article")]
      .map((elPost) => getContent(elPost))
      .filter((elPost) => elPost.thumb && elPost.title);

    return { posts: [...postsData] };
  }
}

export default new G4m3T();
