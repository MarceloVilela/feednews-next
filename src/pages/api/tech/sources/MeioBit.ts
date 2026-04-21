import { JSDOM } from "jsdom";
import IResponseHomeDTO from ".";

class MeioBit {
  getOriginUrl() {
    return "https://meiobit.com";
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = await JSDOM.fromURL(`${url}`);
    const { document } = response.window;

    const getContent = (elPost: Element) => ({
      link: elPost.getAttribute("href"),
      title: elPost.querySelector("h2")?.textContent,
      thumb: elPost
        .querySelector(".cover")
        ?.getAttribute("style")
        ?.split("(")[1]
        ?.split(")")[0],
      // preview: '',
      created_at: elPost
        .querySelector("p.details")
        ?.textContent?.split(" ")
        ?.slice(3)
        ?.join(" "),
    });

    const postsData = [
      ...document.querySelectorAll(".col-articles-list.f-left .list-post-link"),
    ].map((elPost) => getContent(elPost));

    return { posts: postsData };
  }
}

export default new MeioBit();
