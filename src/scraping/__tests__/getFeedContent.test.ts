import { FeedSource, Origin } from "types/feed";

import { getFeedContent } from "../getFeedContent";

jest.mock("next/navigation", () => ({
  notFound: jest.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

describe("getFeedContent", () => {
  const origins: Origin[] = [{ title: "site-a", url: "https://site-a.example" }];

  it("chama notFound() quando o slug não bate com nenhuma origin", async () => {
    const sources: FeedSource[] = [];

    await expect(
      getFeedContent(sources, origins, "inexistente"),
    ).rejects.toThrow("NEXT_NOT_FOUND");
  });

  it("chama notFound() quando o slug bate mas nenhuma source cobre essa origin", async () => {
    const sources: FeedSource[] = [
      {
        getOriginUrl: () => "https://outro-site.example",
        getHome: jest.fn(),
      },
    ];

    await expect(
      getFeedContent(sources, origins, "site-a"),
    ).rejects.toThrow("NEXT_NOT_FOUND");
  });

  it("aplica dedupeById nos posts retornados pela source", async () => {
    const sources: FeedSource[] = [
      {
        getOriginUrl: () => "https://site-a.example",
        getHome: jest.fn().mockResolvedValue({
          posts: [
            { link: "https://site-a.example/post-1", title: "Post 1", thumb: "t1", created_at: "2026-01-01" },
            { link: "https://site-a.example/post-1", title: "Post 1 duplicado", thumb: "t1", created_at: "2026-01-01" },
            { link: "https://site-a.example/post-2", title: "Post 2", thumb: "t2", created_at: "2026-01-02" },
          ],
        }),
      },
    ];

    const result = await getFeedContent(sources, origins, "site-a");

    expect(result).toHaveLength(2);
    expect(result.map((item) => item.id)).toEqual([
      "https://site-a.example/post-1",
      "https://site-a.example/post-2",
    ]);
  });
});
