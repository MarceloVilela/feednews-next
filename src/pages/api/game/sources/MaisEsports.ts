import axios from "axios";
import { JSDOM } from "jsdom";
import ITrendDTO, {
  ISource,
  ISearchParams,
  IShowDetailMagnetDTO,
  Answer,
  IResponseHomeDTO,
} from ".";

class MaisEsports implements ISource {
  getOriginUrl(): string {
    return "https://maisesports.com.br";
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

  async getHome_(): Promise<IResponseHomeDTO> {
    console.log("draft-getHome");
    const { data } = await axios.get(
      "https://noticias.maisesports.com.br/graphql",
    );
    console.log("data", data.posts);
    return { posts: data.posts };
  }
}

export default new MaisEsports();
