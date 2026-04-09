import { createContext, ReactNode, useEffect, useState } from "react";

interface SettingsContextData {
  originTech: string;
  originTechChange: (value: string) => void;
  originGame: string;
  originGameChange: (value: string) => void;
}

interface SettingsProviderProps {
  children: ReactNode;
  originTech: string;
  originGame: string;
}

export const SettingsContext = createContext({} as SettingsContextData);

export function SettingsProvider({
  children,
  originTech: originParam,
  originGame: originGameParam,
  ...rest
}: SettingsProviderProps) {
  const [originTech, setOriginTech] = useState(originParam);
  const [originGame, setOriginGame] = useState(originGameParam);

  function originTechChange(value: string) {
    setOriginTech(value);
  }

  function originGameChange(value: string) {
    setOriginGame(value);
  }

  return (
    <SettingsContext.Provider value={{
      originTech,
      originTechChange,
      originGame,
      originGameChange
    }}
    >
      {children}
    </SettingsContext.Provider>
  )
}
