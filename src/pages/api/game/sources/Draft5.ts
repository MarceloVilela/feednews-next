import axios from 'axios';
import ITrendDTO, { ISource, ISearchParams, IShowDetailMagnetDTO, Answer, IResponseHomeDTO } from '.';

class Draft5 implements ISource {
  getOriginUrl(): string {
    return 'https://draft5.gg';
  }

  async getHome(): Promise<IResponseHomeDTO> {
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
}

export default new Draft5();
