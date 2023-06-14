import { JSDOM } from 'jsdom';
import IResponseHomeDTO from '.';

class TecnoBlogMeioBit {
  getOriginUrl(): string {
    return 'https://tecnoblog.net/meiobit';
  }

  async getHome(): Promise<IResponseHomeDTO> {
    return { posts: [] };
  }
}

export default new TecnoBlogMeioBit();
