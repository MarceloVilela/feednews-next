import request from "supertest";
import { IncomingMessage, ServerResponse } from "http";
import { NextApiHandler } from "next";

import { Post } from "pages/api/tech/sources";

// Importe o handler da sua API. Ajuste o caminho se necessário.
// Exemplo: import gameSourceHandler from '../src/pages/api/game/source';
// Para este exemplo, vamos assumir que o handler está em:
import gameSourceHandler from "../game/source";
import { sources } from "../game/sources";

jest.setTimeout(20000);

// Função para criar um servidor HTTP a partir do handler da API Next.js
function createTestServer(apiHandler: NextApiHandler) {
  return (req: IncomingMessage, res: ServerResponse) => {
    const parsedUrl = new URL(
      req.url || "",
      `http://${req.headers.host || "localhost"}`,
    );
    (req as any).query = Object.fromEntries(parsedUrl.searchParams.entries());

    let chunks: Buffer[] = [];
    req.on("data", (chunk) => {
      chunks.push(chunk as Buffer);
    });

    req.on("end", () => {
      const body = Buffer.concat(chunks).toString();
      try {
        (req as any).body = body ? JSON.parse(body) : {};
      } catch (e) {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        return res.end(JSON.stringify({ error: "Invalid JSON body" }));
      }

      (res as any).status = (statusCode: number) => {
        res.statusCode = statusCode;
        return res as any;
      };
      (res as any).json = (payload: unknown) => {
        if (!res.headersSent) {
          res.setHeader("Content-Type", "application/json");
        }
        return res.end(JSON.stringify(payload));
      };

      Promise.resolve(apiHandler(req as any, res as any)).catch((error) => {
        if (!res.writableEnded) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: String(error) }));
        }
      });
    });

    req.on("error", (error) => {
      if (!res.writableEnded) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: String(error) }));
      }
    });
  };
}

describe("Game Source API Integration Tests", () => {
  let server: ReturnType<typeof createTestServer>;

  beforeEach(() => {
    server = createTestServer(gameSourceHandler);
  });

  //const sourcesData = [{ url: "https://news.xbox.com/pt-br" }];
  const sourcesData = sources.map((item) => ({ url: item.getOriginUrl() }));

  /**
   * Executes the same test logic across a collection of data.
   * Identifies the specific data source using the URL parameter.
   */
  it.each(sourcesData)(
    "should return 200 status and valid data, source($url)",
    async ({ url }) => {
      const response = await request(server).get(
        "/api/game/source?url=" + encodeURIComponent(url),
      );

      expect(response.status).toBe(200);
      expect(response.headers["content-type"]).toMatch(/json/);

      expect(response.body).toHaveProperty("data");
      expect(response.body).toHaveProperty("total");

      expect(Array.isArray(response.body.data)).toBe(true);
      expect(typeof response.body.total).toBe("number");

      const urlRegex = /^https?:\/\/.+/;

      expect(response.body.data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            link: expect.stringMatching(urlRegex),
            thumb: expect.stringMatching(urlRegex),
            title: expect.any(String),
            id: expect.any(String),
          }),
        ]),
      );

      const item = response.body.data[0];
      expect(() => new URL(item.link)).not.toThrow();
      expect(() => new URL(item.thumb)).not.toThrow();

      //expect(
      //  response.body.data.every((item: Post) => item.id === item.link),
      //).toBe(true);
    },
  );

  it("should return a structured error when the URL parameter is missing", async () => {
    const response = await request(server).get("/api/game/source");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "error",
      "Missing url query parameter",
    );
  });

  it("should return a structured error when the alias is unknown", async () => {
    const response = await request(server).get(
      "/api/game/source?url=nonexistent-site.com",
    );

    expect(response.status).toBeGreaterThanOrEqual(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toContain("Alias not found");
  });
});
