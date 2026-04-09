import React, { Fragment, ReactNode } from "react";

import { StyleSwitcherProvider, useStyleSwitcher } from "./styleSwitcher";
import { SettingsProvider } from "./settings";

import originsGame from "../assets/json/game/origins.json";
import originsTech from "../assets/json/tech/origins.json";
import { ThemeProvider } from "@/components/ui/theme-provider";

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <SettingsProvider
      originGame={originsGame.origins[0].url}
      originTech={originsTech.origins[0].url}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </SettingsProvider>
  );
};

export default AppProvider;
