/** @jest-environment jsdom */

import { render, screen } from "@testing-library/react";

import ArticleCardShadcn from "../ArticleCardShadcn";

describe("ArticleCardShadcn", () => {
  it("não renderiza itens quando articles é um array vazio", () => {
    const { container } = render(<ArticleCardShadcn articles={[]} />);

    expect(container.querySelectorAll("a")).toHaveLength(0);
  });

  it("não renderiza itens quando o primeiro article tem title vazio", () => {
    const { container } = render(
      <ArticleCardShadcn
        articles={[{ id: "1", title: "", link: "https://example.com/1", thumb: "thumb-1" }]}
      />,
    );

    expect(container.querySelectorAll("a")).toHaveLength(0);
  });

  it("renderiza o título de cada article quando o array está populado", () => {
    render(
      <ArticleCardShadcn
        articles={[
          { id: "1", title: "Post 1", link: "https://example.com/1", thumb: "https://example.com/thumb-1.jpg" },
          { id: "2", title: "Post 2", link: "https://example.com/2", thumb: "https://example.com/thumb-2.jpg" },
        ]}
      />,
    );

    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Post 2")).toBeInTheDocument();
  });
});
