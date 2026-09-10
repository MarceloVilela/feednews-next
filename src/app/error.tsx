"use client";

import { RouteError } from "components/Feed/RouteError";

export default function HomeError({ error, reset }: { error: Error; reset: () => void }) {
  return <RouteError error={error} reset={reset} />;
}
