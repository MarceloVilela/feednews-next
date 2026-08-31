"use client";

export default function GameError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="my-4 text-center text-sm text-muted-foreground">
      <p>Não foi possível carregar os posts agora. Tente novamente em instantes.</p>
      <button onClick={() => reset()} className="mt-2 underline">
        Tentar novamente
      </button>
    </div>
  );
}
