import request from "supertest";
import { IncomingMessage, ServerResponse } from "http";
import { NextApiHandler } from "next";

// Importe o handler da sua API. Ajuste o caminho se necessário.
// Exemplo: import gameSourceHandler from '../src/pages/api/game/source';
// Para este exemplo, vamos assumir que o handler está em:
import gameSourceHandler from "../game/source";

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

  it("should return 200 status and valid JSON with game source data", async () => {
    const response = await request(server).get(
      "/api/game/source?url=news.xbox",
    );

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toHaveProperty("data");
    expect(response.body).toHaveProperty("total", 24);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data).toHaveLength(24);

    expect(response.body.data[0]).toMatchObject({
      link: "https://news.xbox.com/pt-br/2026/04/07/chegando-ao-xbox-game-pass-abril-wave-1/",
      title:
        "Chegando ao Xbox Game Pass: Kiln, Hades II, Vampire Crawlers e mais",
      thumb:
        "https://xboxwire.thesourcemediaassets.com/sites/8/2026/04/XBOX_GamePass_Announcement_16x9_04.07.2026_PT-BR-97ceb6c4474c86031fd1.jpg",
      id: "https://news.xbox.com/pt-br/2026/04/07/chegando-ao-xbox-game-pass-abril-wave-1/",
    });

    expect(response.body.data.every((item: any) => item.id === item.link)).toBe(
      true,
    );
  });

  it("should return a structured error when the URL parameter is missing", async () => {
    const response = await request(server).get("/api/game/source");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("success", false);
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
