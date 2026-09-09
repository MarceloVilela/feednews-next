import type { AppProps } from "next/app";

//import "tw-elements/dist/css/tw-elements.min.css";
//import "tailwindcss/tailwind.css";
import "../styles/shadcn.css";

import AppProvider from "../hooks";
import { NavigationBar } from "components/Navigation/NavigationBar";

//if (typeof window !== "undefined") document.documentElement.classList.remove('dark');

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-col w-full items-center px-0 min-h-screen">
          {/* borda de debug desativada de propósito — reativar trocando "mx-auto" por
              "mx-auto border border-1" */}
          <main className="w-full max-w-[1124px] mx-auto">
            <NavigationBar />
          </main>

          {/* borda de debug desativada de propósito — reativar trocando "mx-auto" por
              "mx-auto border border-1" */}
          <main className="w-full max-w-[1124px] mx-auto flex-col flex-1 items-center mt-5">
            <Component {...pageProps} />
          </main>
        </div>
      </div>
    </AppProvider>
  );
}

export default MyApp;
