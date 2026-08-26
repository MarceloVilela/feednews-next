/** @jest-environment jsdom */
import { render, screen, fireEvent } from "@testing-library/react";

import { StyleSwitcherProvider, useStyleSwitcher } from "../styleSwitcher";

function Consumer() {
  const { alias, switchAlias } = useStyleSwitcher();

  return (
    <div>
      <span data-testid="alias">{alias}</span>
      <button onClick={switchAlias}>switch</button>
    </div>
  );
}

describe("StyleSwitcherProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("usa o tema salvo em localStorage como estado inicial", () => {
    localStorage.setItem("@DevFinder:theme", "light");

    render(
      <StyleSwitcherProvider>
        <Consumer />
      </StyleSwitcherProvider>,
    );

    expect(screen.getByTestId("alias")).toHaveTextContent("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("cai para 'dark' quando não há tema salvo", () => {
    render(
      <StyleSwitcherProvider>
        <Consumer />
      </StyleSwitcherProvider>,
    );

    expect(screen.getByTestId("alias")).toHaveTextContent("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("switchAlias alterna o tema, a classe do documento e persiste em localStorage", () => {
    localStorage.setItem("@DevFinder:theme", "dark");

    render(
      <StyleSwitcherProvider>
        <Consumer />
      </StyleSwitcherProvider>,
    );

    fireEvent.click(screen.getByText("switch"));

    expect(screen.getByTestId("alias")).toHaveTextContent("light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("@DevFinder:theme")).toBe("light");
  });
});
