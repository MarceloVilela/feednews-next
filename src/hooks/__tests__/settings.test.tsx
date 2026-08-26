/** @jest-environment jsdom */
import { useContext } from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { SettingsContext, SettingsProvider } from "../settings";

function Consumer() {
  const { originTech, originTechChange, originGame, originGameChange } =
    useContext(SettingsContext);

  return (
    <div>
      <span data-testid="tech">{originTech}</span>
      <span data-testid="game">{originGame}</span>
      <button onClick={() => originTechChange("tech-b")}>change-tech</button>
      <button onClick={() => originGameChange("game-b")}>change-game</button>
    </div>
  );
}

describe("SettingsProvider", () => {
  it("expõe os valores iniciais recebidos via props", () => {
    render(
      <SettingsProvider originTech="tech-a" originGame="game-a">
        <Consumer />
      </SettingsProvider>,
    );

    expect(screen.getByTestId("tech")).toHaveTextContent("tech-a");
    expect(screen.getByTestId("game")).toHaveTextContent("game-a");
  });

  it("originTechChange atualiza só originTech, sem afetar originGame", () => {
    render(
      <SettingsProvider originTech="tech-a" originGame="game-a">
        <Consumer />
      </SettingsProvider>,
    );

    fireEvent.click(screen.getByText("change-tech"));

    expect(screen.getByTestId("tech")).toHaveTextContent("tech-b");
    expect(screen.getByTestId("game")).toHaveTextContent("game-a");
  });

  it("originGameChange atualiza só originGame, sem afetar originTech", () => {
    render(
      <SettingsProvider originTech="tech-a" originGame="game-a">
        <Consumer />
      </SettingsProvider>,
    );

    fireEvent.click(screen.getByText("change-game"));

    expect(screen.getByTestId("game")).toHaveTextContent("game-b");
    expect(screen.getByTestId("tech")).toHaveTextContent("tech-a");
  });
});
