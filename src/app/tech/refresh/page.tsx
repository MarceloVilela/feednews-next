import { Metadata } from "next";

import RefreshClient from "./RefreshClient";

export const metadata: Metadata = { title: "News | Refresh" };

export default function Page() {
  return <RefreshClient />;
}
