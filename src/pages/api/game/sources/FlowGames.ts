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
    return "https://flowgames.gg";
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
        link: elPost.querySelector("h3 a")?.getAttribute("href"),
        title: replaceSpaces(String(elPost.querySelector("h3 a")?.textContent)),
        thumb:
          this.getOriginUrl() +
          elPost.querySelector("img")?.getAttribute("src"),
        created_at: replaceSpaces(
          String(
            elPost
              .querySelector(".data")
              ?.textContent.replace(/\./g, "/")
              .replace(" às", ""),
          ),
        ),
      };
    };

    const postsData = [...document.querySelectorAll(".list-post li")]
      .map((elPost) => getContent(elPost))
      .filter((elPost) => elPost.thumb && elPost.title != "undefined");

    const getContentSlide = (elPost: Element) => {
      return {
        link: elPost.querySelector("a + a")?.getAttribute("href"),
        title: replaceSpaces(String(elPost.querySelector("h2")?.textContent)),
        thumb:
          this.getOriginUrl() +
          elPost.querySelector("img")?.getAttribute("data-src"),
        created_at: replaceSpaces(
          String(elPost.querySelector(".elementor-post-date")?.textContent),
        ),
      };
    };

    const postsSlideData = [...document.querySelectorAll(".slick-slide")].map(
      (elPost) => getContentSlide(elPost),
    );
    //.filter((elPost) => elPost.thumb && elPost.title != "undefined");

    console.log("slides" + Date.now());
    console.log(postsSlideData);

    return { posts: [...postsSlideData, ...postsData] };
  }
}

export default new ComboInfinito();
