import Gizmodo from "./GizModo";
import TecnoBlogMeioBit from "./TecnoBlogMeioBit";
import TecnoBlog from "./TecnoBlog";
import MeioBit from "./MeioBit";
import Tecmundo from "./Tecmundo";
import MundoBit from "./MundoBit";
import CanalTech from "./CanalTech";
import UolTecnologia from "./UolTecnologia";
import OlharDigital from "./OlharDigital";
import Leak from "./Leak";
import MaisTecnologia from "./MaisTecnologia";
import Adrenaline from "./Adrenaline";
import CocaTech from "./CocaTech";
import ExameTecnologia from "./ExameTecnologia";
import ShowMeTech from "./ShowMeTech";
import TudoEmTecnologia from "./TudoEmTecnologia";
import SapoTek from "./SapoTek";
import FourGNews from "./FourGNews";
import TechTudo from "./TechTudo";

export interface Post {
  link: string | null | undefined;
  title: string | null | undefined;
  thumb: string | null | undefined;
  created_at: string | null | undefined;
}

export default interface IResponseHomeDTO {
  posts: Post[];
}

export interface ISource {
  getOriginUrl(): string;

  getHome(): Promise<IResponseHomeDTO>;
}

let sources: Array<ISource>;
sources = [
  Gizmodo,
  //TecnoBlogMeioBit,
  TecnoBlog,
  //MeioBit,
  Tecmundo,
  MundoBit,
  CanalTech,
  UolTecnologia,
  OlharDigital,
  Leak,
  MaisTecnologia,
  Adrenaline,
  CocaTech,
  ExameTecnologia,
  ShowMeTech,
  TudoEmTecnologia,
  SapoTek,
  FourGNews,
  TechTudo,
];

const _sourcesRemoved = [
  {
    title: "ComputerWorldPt",
    at: "2026-04-21T00:00:00Z",
    reason: "site offline",
  },
  {
    title: "ProfissionaisTI",
    at: "2026-04-21T00:00:00Z",
    reason: "site offline",
  },
];

export { sources };
