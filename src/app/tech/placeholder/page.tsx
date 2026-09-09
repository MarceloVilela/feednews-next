import { Metadata } from "next";

import PlaceholderClient from "./PlaceholderClient";

export const metadata: Metadata = { title: "News | Placeholder" };

export default function Page() {
  return <PlaceholderClient />;
}
