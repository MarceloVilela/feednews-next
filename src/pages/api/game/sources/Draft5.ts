//import axios from 'axios';
import { JSDOM } from "jsdom";
import ITrendDTO, {
  ISource,
  ISearchParams,
  IShowDetailMagnetDTO,
  Answer,
  IResponseHomeDTO,
} from ".";

class Draft5 implements ISource {
  getOriginUrl(): string {
    return "https://draft5.gg";
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    const getContent = (elPost: Element) => {
      return {
        link:
          this.getOriginUrl() + elPost.querySelector("a")?.getAttribute("href"),
        title: String(elPost.querySelector("h2")?.textContent),
        thumb:
          this.getOriginUrl() +
          elPost
            .querySelector("[srcSet]")
            ?.getAttribute("srcSet")
            ?.split(" ")[0],
        created_at: "",
      };
    };

    const postsData = [
      ...document.querySelectorAll("div[class^='Card__CardContainer']"),
    ]
      .map((elPost) => getContent(elPost))
      .filter((elPost) => elPost.thumb && elPost.title != "undefined");

    return { posts: [...postsData] };
  }

  /*
  async getHome_old(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();

    const { data } = await axios.get('https://api.draft5.gg/news/popular/day');
 
    const results = data.data.map((item: { postTitle: any; postSlug: any; postImage: any; }) => ({
      link: `${url}/noticia/${item.postSlug}`,
      title: item.postTitle,
      thumb: `https://static.draft5.gg/${item.postImage}`,
      created_at: '',
    })).filter((elPost: any) => (elPost.thumb && elPost.title != "undefined"));

    const { data: dataWeek } = await axios.get('https://api.draft5.gg/news/popular/day');

    const resultsWeek = dataWeek.data.map((item: { postTitle: any; postSlug: any; postImage: any; }) => ({
      link: `${url}/noticia/${item.postSlug}`,
      title: item.postTitle,
      thumb: `https://static.draft5.gg/${item.postImage}`,
      created_at: '',
    })).filter((elPost: any) => (elPost.thumb && elPost.title != "undefined"));  

    return { posts: [...results, ...resultsWeek] };
  }
  */
}

export default new Draft5();
