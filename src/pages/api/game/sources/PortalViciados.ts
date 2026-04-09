import { JSDOM } from "jsdom";
import ITrendDTO, {
  ISource,
  ISearchParams,
  IShowDetailMagnetDTO,
  Answer,
  IResponseHomeDTO,
} from ".";

class ComboInfinito implements ISource {
  getOriginUrl(): string {
    return "https://viciados.net";
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
        link: elPost.querySelector("h3.entry-title a")?.getAttribute("href"),
        title: replaceSpaces(
          String(elPost.querySelector("h3.entry-title a")?.textContent)
        ),
        thumb: elPost.querySelector("img")?.getAttribute("src"),
        created_at: replaceSpaces(
          String(elPost.querySelector(".elementor-post-date")?.textContent)
        ),
      };
    };

    const postsData = [...document.querySelectorAll(".block-inner .list-box")]
      .map((elPost) => getContent(elPost))
      .filter((elPost) => elPost.thumb && elPost.title != "undefined");

    return { posts: [...postsData] };
  }
}

export default new ComboInfinito();
