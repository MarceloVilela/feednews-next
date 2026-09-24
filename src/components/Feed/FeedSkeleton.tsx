import { Skeleton } from "@/components/ui/skeleton";

interface FeedSkeletonProps {
  variant?: "cards" | "list";
  count?: number;
}

export function FeedSkeleton({
  variant = "cards",
  count = variant === "list" ? 10 : 6,
}: FeedSkeletonProps) {
  if (variant === "list") {
    return (
      <div className="grid gap-4 px-0 sm:px-4" aria-hidden="true">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="flex w-full items-center gap-3 rounded-xl border border-border px-3 py-2"
          >
            <Skeleton className="h-10 w-10 shrink-0 rounded-md" />
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 px-0 sm:px-4"
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="aspect-[16/9] w-full rounded-2xl" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      ))}
    </div>
  );
}
