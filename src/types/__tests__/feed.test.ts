import { findOrigin } from "../feed";

describe("findOrigin", () => {
  const origins = [
    { title: "site-a", url: "https://site-a.example" },
    { title: "site-b", url: "https://site-b.example" },
  ];

  it("retorna a url da origem quando o slug bate", () => {
    expect(findOrigin(origins, "site-b")).toBe("https://site-b.example");
  });

  it("retorna string vazia por padrão quando o slug não bate (comportamento tech)", () => {
    expect(findOrigin(origins, "inexistente")).toBe("");
  });

  it("retorna o fallbackUrl explícito quando o slug não bate (comportamento game)", () => {
    expect(findOrigin(origins, "inexistente", origins[0].url)).toBe(
      origins[0].url,
    );
  });
});
