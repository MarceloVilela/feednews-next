import Arkade from './Arkade';
import TheEnemy from './TheEnemy';
import Voxel from './Voxel';

export interface ISearchParams {
  search_query: string;
};

export interface Result {

  // https://github.com/qbittorrent/search-plugins/wiki/How-to-write-a-search-plugin#understanding-the-code-1

  link: string, //A string corresponding the the download link(the.torrent file or magnet link)
  name: string, //unicode string corresponding to the torrent's name (i.e: "Ubuntu Linux v6.06")
  size: string, //A string corresponding to the torrent size(i.e: "6 MB" or "200 KB" or "1.2 GB"...)
  seeds: number, //The number of seeds for this torrent(as a string)
  leech: number, //The number of leechers for this torrent(a a string)
  engine_url: string, //The search engine url(i.e: http://www.mininova.org)
  desc_link: string, //A string corresponding to the the description page for the torrent
}

export interface ISource {
  getOriginUrl(): string;

  getHome(): Promise<IResponseHomeDTO>;

  //search(data: ISearchParams): Promise<any[]>;

  //detail(data: IShowDetailMagnetDTO): Promise<Answer>;
}

/*
 * Listas
 */
interface Post {
  link: string | null | undefined;
  title: string | null | undefined;
  thumb: string | null | undefined;
  created_at: string | null | undefined;
}

export interface IResponseHomeDTO {
  posts: Post[];
}

/*
 * Blog
 */
interface ILinkData {
  url: string,
  text: string,
  type: string,
}

export interface Answer {

  links: ILinkData[],
  name: string,
  size?: string,
  seeds?: number,
  leech?: number,
  engine_url: string,
  desc_link: string,
  thumb: string,
}

export default interface ITrendDTO {
  top: Answer[];
  recents: Answer[];
}

export interface IShowDetailMagnetDTO {
  url: string;
};

let sources: Array<ISource>;
sources = [
  TheEnemy,
  Arkade,
  Voxel
];

export { sources };
