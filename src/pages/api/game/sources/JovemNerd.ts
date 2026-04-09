import { JSDOM } from "jsdom";
import ITrendDTO, {
  ISource,
  ISearchParams,
  IShowDetailMagnetDTO,
  Answer,
  IResponseHomeDTO,
} from ".";
import fs from "fs";

class JovemNerd implements ISource {
  getOriginUrl(): string {
    return "https://jovemnerd.com.br";
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    fs.writeFileSync(
      "./jovemnerd.html",
      String(document.querySelector("html")?.innerHTML)
    );

    const replaceSpaces = (text: string) => {
      return text
        .replace(/\n|\r|\t/g, "")
        .replace(/\n|\s{2,}/g, "")
        .replace(/\\n|\\r|\\t/g, "")
        .replace(/\s{2,}/g, "");
    };

    const getContent = (elPost: Element) => {
      return {
        link: this.getOriginUrl() + elPost?.getAttribute("href"),
        title: elPost.querySelector("img")?.getAttribute("alt"),
        thumb: elPost.querySelector("img")?.getAttribute("src"),
        created_at: "",
      };
    };

    const postsData = [...document.querySelectorAll(".flex-col a[aria-label]")]
      .map((elPost) => getContent(elPost))
      .filter(
        (elPost) =>
          elPost.thumb &&
          elPost.title != "undefined" &&
          !elPost.link.includes("autor")
      );

    return { posts: [...postsData] };
  }
}

export default new JovemNerd();
