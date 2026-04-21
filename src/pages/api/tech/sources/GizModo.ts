import { JSDOM } from "jsdom";
import IResponseHomeDTO from ".";
import fs from "fs";

class GizModo {
  getOriginUrl() {
    return "https://gizmodo.com.br/feed";
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
        link:
          elPost.body.innerHTML.match(/http.*<dc/)?.[0].replace("<dc", "") ??
          "",
        title: replaceSpaces(
          String(elPost.querySelector("title")?.textContent),
        ),
        thumb:
          elPost.body.innerHTML.match(/url="http.*"/)?.[0].split('"')[1] ?? "",
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

export default new GizModo();
