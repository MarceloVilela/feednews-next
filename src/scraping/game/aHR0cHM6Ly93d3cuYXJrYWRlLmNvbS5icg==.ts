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

    const getContent = (elPost: Element) => {
      const elTitle = elPost.querySelector("a.a-rt");

      return {
        link: elTitle?.getAttribute("href"),
        title: elTitle?.textContent?.trim(),
        thumb: elPost.querySelector("img")?.getAttribute("src"),
        created_at: elPost.querySelector("time")?.textContent,
      };
    };

    const postsData = [...document.querySelectorAll("article")]
      .map((elPost) => getContent(elPost))
      .filter((elPost) => elPost.link && elPost.thumb && elPost.title);

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
