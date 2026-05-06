import { JSDOM } from "jsdom";
import { ISource, IResponseHomeDTO } from ".";

class MeuPS implements ISource {
  getOriginUrl(): string {
    return "https://meups.com.br/feed/";
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    const response = new JSDOM(await (await fetch(url)).text());
    const { document } = response.window;
    const feed = document.body.innerHTML;
    const items = feed
      .replaceAll("\n", "")
      .replaceAll("\t", "")
      .match(/<item>(.*?)<\/item>/g);

    const replaceSpaces = (text: string) => {
      return text
        .replace(/\n|\r|\t/g, "")
        .replace(/\n|\s{2,}/g, "")
        .replace(/\\n|\\r|\\t/g, "")
        .replace(/\s{2,}/g, "");
    };

    const getContent = (elPost: Document) => {
      return {
        link: elPost
          .querySelector("comments")
          ?.textContent.replace("#respond", ""),
        title: replaceSpaces(
          String(elPost.querySelector("title")?.textContent),
        ),
        thumb: document.body.querySelector("url")?.textContent,
        created_at: "",
      };
    };

    const postsData = (items ?? []).map((elPost) =>
      getContent(new JSDOM(elPost).window.document),
    );
    //.filter((elPost) => elPost.thumb && elPost.title != "undefined");

    return { posts: [...postsData] };
  }
}

export default new MeuPS();
