import { JSDOM } from "jsdom";
import { ISource, IResponseHomeDTO } from ".";

class Adr3n implements ISource {
  getOriginUrl(): string {
    return atob(
      "aHR0cHM6Ly9mb3J1bS5hZHJlbmFsaW5lLmNvbS5ici9mb3J1bXMvcmV0cm8uMjI0Lw==",
    );
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = this.getOriginUrl();
    //const response = await JSDOM.fromURL(`${url}`);
    const response = await JSDOM.fromFile("./html.html");

    const { document } = response.window;
    //fs.writeFileSync("./adrena-retro.html", String(document.querySelector('html')?.innerHTML));

    const replaceSpaces = (text: string) => {
      return text
        .replace(/\n|\r|\t/g, "")
        .replace(/\n|\s{2,}/g, "")
        .replace(/\\n|\\r|\\t/g, "")
        .replace(/\s{2,}/g, "");
    };

    const addHttp = (text: string) => {
      return !text.includes("http") && !text.includes("https")
        ? "https:" + text
        : text;
    };

    const getContent = (elPost: Element) => {
      return {
        link: `${url}${elPost.querySelector(".structItem-title a")?.getAttribute("href")}`,
        title: elPost.querySelector(".structItem-title a")?.textContent,
        thumb: "", //addHttp(String(elPost.querySelector('img')?.getAttribute('src'))),
        created_at: elPost.querySelector("time")?.textContent,
      };
    };

    const postsData = [
      ...document.querySelectorAll(".structItemContainer-group .structItem"),
    ].map((elPost) => getContent(elPost));

    return { posts: [...postsData] };
  }
}

export default new Adr3n();
