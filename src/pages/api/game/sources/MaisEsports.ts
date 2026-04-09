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
        link: `${url}/${elPost.getAttribute("href")}`,
        title: replaceSpaces(String(elPost.querySelector("h3")?.textContent)),
        thumb: elPost
          .querySelector("img[src]")
          ?.getAttribute("src")
          ?.split(" ")[0],
        created_at: "",
      };
    };

    const postsData = [...document.querySelectorAll("section > a")]
      .map((elPost) => getContent(elPost))
      .filter((elPost) => elPost.thumb && elPost.title != "undefined");

    return { posts: [...postsData] };
  }

  async getHome_(): Promise<IResponseHomeDTO> {
    console.log("draft-getHome");
    const { data } = await axios.get(
      "https://noticias.maisesports.com.br/graphql"
    );
    console.log("data", data.posts);
    return { posts: data.posts };

    const results = data.posts.nodes
      .map((item: { postTitle: any; postSlug: any; postImage: any }) => ({
        link: `${this.getOriginUrl()}/${item.slug}`,
        title: item.title,
        thumb: item.featuredImage.sourceUrl,
        created_at: "",
      }))
      .filter((elPost: any) => elPost.thumb && elPost.title != "undefined");

    return { posts: [...results] };
  }
}

export default new MaisEsports();
