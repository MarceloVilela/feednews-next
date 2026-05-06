export type Item = {
  title: string;
  image: string;
  summary: string;
  time?: number | string;
  source?: string;
};

export type NewsCardProps = {
  item: Item;
  onClick?: () => void;
};

export default function NewsCard({ item, onClick }: NewsCardProps) {
  return (
    <button
      onClick={onClick}
      className="group flex w-full gap-3 rounded-xl p-2 text-left transition-colors hover:bg-gray-100 dark:hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      {/* Thumbnail */}
      <div className="h-20 w-24 shrink-0 overflow-hidden rounded-lg md:h-24 md:w-32">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col justify-between py-0.5">
        <h3 className="line-clamp-3 text-sm font-semibold leading-snug text-gray-900 dark:text-gray-100">
          {item.title}
        </h3>

        <p className="mt-1 line-clamp-2 text-xs text-gray-500 dark:text-gray-400">
          {item.summary}
        </p>

        {item.source && item.time && (
          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
            {item.source} · {item.time}
          </p>
        )}
      </div>
    </button>
  );
}
