import { JSDOM } from "jsdom";
import { ISource, IResponseHomeDTO } from ".";

class Ark4d implements ISource {
  getOriginUrl(): string {
    return atob("aHR0cHM6Ly93d3cuYXJrYWRlLmNvbS5icg==");
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
        link: elPost.querySelector("a")?.getAttribute("href"),
        title: replaceSpaces(
          String(elPost.querySelector(".post-content")?.textContent),
        ),
        thumb: elPost
          .querySelector(".background-image-container")
          ?.getAttribute("style")
          ?.split("'")[1],
        created_at: "",
      };
    };

    const postsData = [...document.querySelectorAll(".post")]
      .map((elPost) => getContent(elPost))
      .filter((elPost) => elPost.thumb && elPost.title != "undefined");

    /*const getDataContent = (elPost: Element) => {
      return {
        link: elPost.getAttribute('data-storie'),
        title: replaceSpaces(String(elPost.querySelector('p.card__title')?.textContent)),
        thumb: addHttp(String(elPost.querySelector('.card__image img')?.getAttribute('src'))),
        created_at: replaceSpaces(String(elPost.querySelector('.news-list__item__content__info__time span')?.textContent)),
      };
    };

    const cardsData = [
      ...document.querySelectorAll('.webstories__list .webstories__card'),
    ].map((elPost) => getDataContent(elPost));*/

    return { posts: [...postsData] };
  }
}

export default new Ark4d();
