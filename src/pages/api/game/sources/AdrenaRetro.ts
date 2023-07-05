import { JSDOM } from 'jsdom';
import ITrendDTO, { ISource, ISearchParams, IShowDetailMagnetDTO, Answer, IResponseHomeDTO } from '.';
import fs from 'fs';

class AdrenaRetro implements ISource {
  getOriginUrl(): string {
    return 'https://forum.adrenaline.com.br/forums/retro.224/';
  }

  async getHome(): Promise<IResponseHomeDTO> {
    const url = 'https://forum.adrenaline.com.br';
    //const response = await JSDOM.fromURL(`${url}`);
    const response = await JSDOM.fromFile('./html.html');
    
    const { document } = response.window;
    //fs.writeFileSync("./adrena-retro.html", String(document.querySelector('html')?.innerHTML));

    const replaceSpaces = (text: string) => {
      return text.replace(/\n|\r|\t/g, '')
      .replace(/\n|\s{2,}/g, '')
      .replace(/\\n|\\r|\\t/g, '')
      .replace(/\s{2,}/g, '')
    }

    const addHttp = (text: string) => {
      return !text.includes('http') && !text.includes('https') 
        ? 'https:' + text
        : text
    }

    const getContent = (elPost: Element) => {
      return {
        link: `${url}${elPost.querySelector('.structItem-title a')?.getAttribute('href')}`,
        title: elPost.querySelector('.structItem-title a')?.textContent,
        thumb: '',//addHttp(String(elPost.querySelector('img')?.getAttribute('src'))),
        created_at: elPost.querySelector('time')?.textContent,
      };
    };

    console.log(document.querySelector('.structItemContainer-group')?.innerHTML);
    console.table(['total', [...document.querySelectorAll('.structItemContainer-group')].length])

    const postsData = [
      ...document.querySelectorAll('.structItemContainer-group .structItem'),
    ].map((elPost) => getContent(elPost));

    return { posts: [...postsData] };
  }

}

export default new AdrenaRetro();
