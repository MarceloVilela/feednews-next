import { JSDOM } from "jsdom";
import ITrendDTO, {
  ISource,
  ISearchParams,
  IShowDetailMagnetDTO,
  Answer,
  IResponseHomeDTO,
} from ".";

class Voxel implements ISource {
  getOriginUrl(): string {
    return "https://www.tecmundo.com.br/voxel";
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    const getContent = (elPost: Element) => {
      return {
        link:
          "https://www.tecmundo.com.br" +
          elPost.querySelector("a")?.getAttribute("href"),
        title: elPost.querySelector("h3")?.textContent,
        thumb: elPost.querySelector("img")?.getAttribute("src"),
        created_at: elPost.querySelector(".tec--timestamp")?.textContent,
      };
    };

    const postsData = [
      ...document.querySelectorAll(".grid-cols-1 article"),
    ].map((elPost) => getContent(elPost));

    return { posts: [...postsData] };
  }
}

export default new Voxel();
