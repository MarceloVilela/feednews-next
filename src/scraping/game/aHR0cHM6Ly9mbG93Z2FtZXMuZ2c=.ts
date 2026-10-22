import { JSDOM } from "jsdom";
import { ISource, IResponseHomeDTO } from ".";

class Fl0gg implements ISource {
  getOriginUrl(): string {
    return atob("aHR0cHM6Ly9mbG93Z2FtZXMuZ2c=");
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

    const getPosts = (doc: Document) =>
      [...doc.querySelectorAll(".list-post li")]
        .map((elPost) => getContent(elPost))
        .filter((elPost) => elPost.thumb && elPost.title != "undefined");

    const documentPage2 = await JSDOM.fromURL(`${url}/noticias/page/2/`)
      .then((res) => res.window.document)
      .catch(() => undefined);

    const postsData = [
      ...new Map(
        [
          ...getPosts(document),
          ...(documentPage2 ? getPosts(documentPage2) : []),
        ].map((post) => [post.link, post] as const),
      ).values(),
    ];

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

    return { posts: [...postsSlideData, ...postsData] };
  }
}

export default new Fl0gg();
