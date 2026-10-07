import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "News | Página não encontrada" };

export default function NotFound() {
  return (
    <div className="my-4 text-center text-sm text-muted-foreground">
      <p>Não encontramos esta página ou fonte.</p>
      <Link href="/" className="mt-2 inline-block underline">
        Voltar para a home
      </Link>
    </div>
  );
}
