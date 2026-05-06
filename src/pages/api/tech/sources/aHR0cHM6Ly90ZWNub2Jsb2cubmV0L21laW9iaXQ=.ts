import { JSDOM } from "jsdom";
import IResponseHomeDTO from ".";

class T3cn0 {
  getOriginUrl(): string {
    return "aHR0cHM6Ly90ZWNub2Jsb2cubmV0L21laW9iaXQ=";
  }

  async getHome(): Promise<IResponseHomeDTO> {
    return { posts: [] };
  }
}

export default new T3cn0();
