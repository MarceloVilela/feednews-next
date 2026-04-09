import Adrena from "./Adrena";
import AdrenaRetro from "./AdrenaRetro";
import ArenaXbox from "./ArenaXbox";
import Arkade from "./Arkade";
import ComboInfinito from "./ComboInfinito";
import GameVicio from "./GameVicio";
import PortalViciados from "./PortalViciados";
import XboxWire from "./XboxWire";
import FlowGames from "./FlowGames";
import CriticalHits from "./CriticalHits";
import Draft5 from "./Draft5";
import Dust2 from "./Dust2";
import Espn from "./Espn";
import G1Games from "./G1Games";
import GEEsports from "./GEEsports";
import GameBlast from "./GameBlast";
import GameHall from "./GameHall";
import GameTimes from "./GameTimes";
import IgnBr from "./IgnBr";
import JogaZera from "./JogaZera";
import JovemNerd from "./JovemNerd";
import LanceEsports from "./LanceEsports";
import MaisEsports from "./MaisEsports";
import MeuPS from "./MeuPS";
import Millenium from "./Millenium";
import NintendoBlast from "./NintendoBlast";
import Overloadr from "./Overloadr";
import PlayReplay from "./PlayReplay";
import PsxBrasil from "./PsxBrasil";
import StartUol from "./StartUol";
import TechTudoESports from "./TechTudoESports";
import TechTudoJogos from "./TechTudoJogos";
import TheClutch from "./TheClutch";
import TheEnemy from "./TheEnemy";
import UniversoNintendo from "./UniversoNintendo";
import Voxel from "./Voxel";
import WindowsClub from "./WindowsClub";
import XboxPower from "./XboxPower";

export interface ISearchParams {
  search_query: string;
}

export interface Result {
  // https://github.com/qbittorrent/search-plugins/wiki/How-to-write-a-search-plugin#understanding-the-code-1

  link: string; //A string corresponding the the download link(the.torrent file or magnet link)
  name: string; //unicode string corresponding to the torrent's name (i.e: "Ubuntu Linux v6.06")
  size: string; //A string corresponding to the torrent size(i.e: "6 MB" or "200 KB" or "1.2 GB"...)
  seeds: number; //The number of seeds for this torrent(as a string)
  leech: number; //The number of leechers for this torrent(a a string)
  engine_url: string; //The search engine url(i.e: http://www.mininova.org)
  desc_link: string; //A string corresponding to the the description page for the torrent
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
  url: string;
  text: string;
  type: string;
}

export interface Answer {
  links: ILinkData[];
  name: string;
  size?: string;
  seeds?: number;
  leech?: number;
  engine_url: string;
  desc_link: string;
  thumb: string;
}

export default interface ITrendDTO {
  top: Answer[];
  recents: Answer[];
}

export interface IShowDetailMagnetDTO {
  url: string;
}

let sources: Array<ISource>;
sources = [
  TheEnemy,
  Arkade,
  Voxel,

  GameVicio,
  PortalViciados,
  XboxWire,
  FlowGames,

  //AdrenaRetro,
  ArenaXbox,
  ComboInfinito,
  CriticalHits,
  IgnBr,
  NintendoBlast,
  PsxBrasil,
  WindowsClub,

  Adrena,
  Draft5,
  Dust2,
  Espn,
  G1Games,
  GameBlast,
  GameHall,
  GEEsports,
  JogaZera,
  JovemNerd,
  LanceEsports,
  MaisEsports,
  MeuPS,
  Millenium,
  Overloadr,
  PlayReplay,
  StartUol,
  TechTudoESports,
  TechTudoJogos,
  TheClutch,
  GameTimes,
  UniversoNintendo,
  XboxPower,
];

export { sources };
