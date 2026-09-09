import { GET } from "app/api/tech/source/route";
import { Post, sources } from "../tech";

jest.setTimeout(20000);

function callRoute(url: string) {
  return GET(new Request(url));
}

describe("Game Source API Integration Tests", () => {
  const sourcesData = sources.map((item) => ({ url: item.getOriginUrl() }));

  /**
   * Executes the same test logic across a collection of data.
   * Identifies the specific data source using the URL parameter.
   */
  it.each(sourcesData)(
    "should return 200 status and valid data, source($url)",
    async ({ url }) => {
      const response = await callRoute(
        "http://localhost/api/tech/source?url=" + encodeURIComponent(url),
      );

      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toMatch(/json/);

      const body = await response.json();

      expect(body).toHaveProperty("data");
      expect(body).toHaveProperty("total");

      expect(Array.isArray(body.data)).toBe(true);
      expect(typeof body.total).toBe("number");

      const urlRegex = /^https?:\/\/.+/;

      expect(body.data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            link: expect.stringMatching(urlRegex),
            thumb: expect.stringMatching(urlRegex),
            title: expect.any(String),
            id: expect.any(String),
          }),
        ]),
      );

      const item = body.data[0];
      expect(() => new URL(item.link)).not.toThrow();
      expect(() => new URL(item.thumb)).not.toThrow();
    },
  );

  it("should return a structured error when the URL parameter is missing", async () => {
    const response = await callRoute("http://localhost/api/tech/source");

    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body).toHaveProperty("error", "Missing url query parameter");
  });

  it("should return a structured error when the alias is unknown", async () => {
    const response = await callRoute(
      "http://localhost/api/tech/source?url=nonexistent-site.com",
    );

    expect(response.status).toBeGreaterThanOrEqual(400);
    const body = await response.json();
    expect(body).toHaveProperty("error");
    expect(body.error).toContain("Alias not found");
  });

  it("should return a structured error when the URL parameter is repeated", async () => {
    const response = await callRoute(
      "http://localhost/api/tech/source?url=a&url=b",
    );

    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body).toHaveProperty("error", "Missing url query parameter");
  });
});
