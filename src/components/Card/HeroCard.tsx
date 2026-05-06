export type Item = {
  title: string;
  image: string;
  summary?: string;
  category?: string;
  time?: string;
  source?: string;
};

export type HeroCardProps = {
  item: Item;
  onClick?: () => void;
};

export default function HeroCard({ item, onClick }: HeroCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative w-full overflow-hidden rounded-2xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      {/* Image */}
      <div className="aspect-[16/9] w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
        {item.category && (
          <span className="mb-2 inline-block rounded-full bg-primary px-3 py-0.5 text-xs font-semibold uppercase tracking-wide text-white">
            {item.category}
          </span>
        )}

        <h2 className="text-md font-bold leading-snug text-white md:text-md line-clamp-2">
          {item.title}
        </h2>

        <p className="mt-1 line-clamp-2 text-sm text-white/80">
          {item.summary}
        </p>

        {item.source && item.time && (
          <p className="mt-2 text-xs text-white/60">
            {item.source} · {item.time}
          </p>
        )}
      </div>
    </button>
  );
}
