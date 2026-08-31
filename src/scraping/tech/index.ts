import aHR0cHM6Ly9naXptb2RvLmNvbS5ici9mZWVk from "./aHR0cHM6Ly9naXptb2RvLmNvbS5ici9mZWVk";
import aHR0cHM6Ly90ZWNub2Jsb2cubmV0 from "./aHR0cHM6Ly90ZWNub2Jsb2cubmV0";
import aHR0cHM6Ly93d3cudGVjbXVuZG8uY29tLmJy from "./aHR0cHM6Ly93d3cudGVjbXVuZG8uY29tLmJy";
import aHR0cHM6Ly9ibG9ncy5uZTEwLnVvbC5jb20uYnIvbXVuZG9iaXQv from "./aHR0cHM6Ly9ibG9ncy5uZTEwLnVvbC5jb20uYnIvbXVuZG9iaXQv";
import aHR0cHM6Ly9jYW5hbHRlY2guY29tLmJy from "./aHR0cHM6Ly9jYW5hbHRlY2guY29tLmJy";
import aHR0cHM6Ly93d3cudW9sLmNvbS5ici90aWx0 from "./aHR0cHM6Ly93d3cudW9sLmNvbS5ici90aWx0";
import aHR0cHM6Ly9vbGhhcmRpZ2l0YWwuY29tLmJy from "./aHR0cHM6Ly9vbGhhcmRpZ2l0YWwuY29tLmJy";
import aHR0cHM6Ly93d3cubGVhay5wdA from "./aHR0cHM6Ly93d3cubGVhay5wdA==";
import aHR0cHM6Ly93d3cubWFpc3RlY25vbG9naWEuY29t from "./aHR0cHM6Ly93d3cubWFpc3RlY25vbG9naWEuY29t";
import aHR0cHM6Ly93d3cuYWRyZW5hbGluZS5jb20uYnI from "./aHR0cHM6Ly93d3cuYWRyZW5hbGluZS5jb20uYnI=";
//import aHR0cHM6Ly9jb2NhdGVjaC5jb20uYnI from "./aHR0cHM6Ly9jb2NhdGVjaC5jb20uYnI=";
import aHR0cHM6Ly9leGFtZS5jb20 from "./aHR0cHM6Ly9leGFtZS5jb20=";
import aHR0cHM6Ly93d3cuc2hvd21ldGVjaC5jb20uYnI from "./aHR0cHM6Ly93d3cuc2hvd21ldGVjaC5jb20uYnI=";
import aHR0cHM6Ly90dWRvZW10ZWNub2xvZ2lhLmNvbS9jYXRlZ29yaWEvbm90aWNpYXMv from "./aHR0cHM6Ly90dWRvZW10ZWNub2xvZ2lhLmNvbS9jYXRlZ29yaWEvbm90aWNpYXMv";
import aHR0cHM6Ly90ZWsuc2Fwby5wdA from "./aHR0cHM6Ly90ZWsuc2Fwby5wdA==";
import aHR0cHM6Ly80Z25ld3MucHQ from "./aHR0cHM6Ly80Z25ld3MucHQ=";
import aHR0cHM6Ly93d3cudGVjaHR1ZG8uY29tLmJy from "./aHR0cHM6Ly93d3cudGVjaHR1ZG8uY29tLmJy";

//import aHR0cHM6Ly93d3cuY29tcHV0ZXJ3b3JsZC5jb20ucHQ= from "./aHR0cHM6Ly93d3cuY29tcHV0ZXJ3b3JsZC5jb20ucHQ=";
//import aHR0cHM6Ly9tZWlvYml0LmNvbQ== from "./aHR0cHM6Ly9tZWlvYml0LmNvbQ==";
//import aHR0cHM6Ly93d3cucHJvZmlzc2lvbmFpc3RpLmNvbS5icg== from "./aHR0cHM6Ly93d3cucHJvZmlzc2lvbmFpc3RpLmNvbS5icg==";
//import aHR0cHM6Ly90ZWNub2Jsb2cubmV0L21laW9iaXQ= from "./aHR0cHM6Ly90ZWNub2Jsb2cubmV0L21laW9iaXQ=";

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
  aHR0cHM6Ly9naXptb2RvLmNvbS5ici9mZWVk,
  aHR0cHM6Ly90ZWNub2Jsb2cubmV0,
  aHR0cHM6Ly93d3cudGVjbXVuZG8uY29tLmJy,
  aHR0cHM6Ly9ibG9ncy5uZTEwLnVvbC5jb20uYnIvbXVuZG9iaXQv,
  aHR0cHM6Ly9jYW5hbHRlY2guY29tLmJy,
  aHR0cHM6Ly93d3cudW9sLmNvbS5ici90aWx0,
  aHR0cHM6Ly9vbGhhcmRpZ2l0YWwuY29tLmJy,
  aHR0cHM6Ly93d3cubGVhay5wdA,
  aHR0cHM6Ly93d3cubWFpc3RlY25vbG9naWEuY29t,
  aHR0cHM6Ly93d3cuYWRyZW5hbGluZS5jb20uYnI,
  aHR0cHM6Ly9leGFtZS5jb20,
  aHR0cHM6Ly93d3cuc2hvd21ldGVjaC5jb20uYnI,
  aHR0cHM6Ly90dWRvZW10ZWNub2xvZ2lhLmNvbS9jYXRlZ29yaWEvbm90aWNpYXMv,
  aHR0cHM6Ly90ZWsuc2Fwby5wdA,
  aHR0cHM6Ly80Z25ld3MucHQ,
  aHR0cHM6Ly93d3cudGVjaHR1ZG8uY29tLmJy,
];

const _sourcesRemoved = [
  {
    title: "aHR0cHM6Ly93d3cuY29tcHV0ZXJ3b3JsZC5jb20ucHQ=",
    at: "2026-04-21T00:00:00Z",
    reason: "site offline",
  },
  {
    title: "aHR0cHM6Ly93d3cucHJvZmlzc2lvbmFpc3RpLmNvbS5icg==",
    at: "2026-04-21T00:00:00Z",
    reason: "site offline",
  },
  {
    title: "aHR0cHM6Ly9jb2NhdGVjaC5jb20uYnI",
    at: "2026-06-22T00:00:00Z",
    reason: "site offline",
  },
];

export { sources };
