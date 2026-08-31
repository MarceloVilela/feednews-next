import { Metadata } from "next";

import { TechFeed } from "components/Feed/TechFeed";
import originsJson from "assets/json/tech/origins";

const origins = originsJson.origins;
const firstOriginSlug = origins[0]?.title ?? "";

export const revalidate = 86400; // 24 horas

export const metadata: Metadata = {
  title: `News | ${firstOriginSlug}`,
};

export default function HomePage() {
  return <TechFeed slug={firstOriginSlug} />;
}
