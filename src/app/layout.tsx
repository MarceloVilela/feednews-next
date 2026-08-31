import type { Metadata } from "next";

import "../styles/shadcn.css";

import AppProvider from "hooks";
import { NavigationBar } from "components/Navigation/NavigationBar";

export const metadata: Metadata = {
  title: "News",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <AppProvider>
          <div className="flex flex-col min-h-screen">
            <div className="flex flex-col w-full items-center px-0 min-h-screen">
              <main className="w-full max-w-[1124px] mx-auto  border- border-1-">
                <NavigationBar />
              </main>

              <main className="w-full max-w-[1124px] mx-auto border- border-1- flex-col flex-1 items-center mt-5">
                {children}
              </main>
            </div>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
