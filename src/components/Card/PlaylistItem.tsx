export type Item = {
  index?: number;
  title: string;
  avatar?: string;
  image: string;
  artist: string;
  duration?: number | string;
};

export type PlaylistItemProps = {
  item: Item;
  onClick?: () => void;
};

export default function PlaylistItem({ item, onClick }: PlaylistItemProps) {
  return (
    <button
      onClick={onClick}
      className="group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left 
      transition-colors hover:bg-gray-100 dark:hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
      dark:bg-gray-950/90 bg-white/50"
    >
      {/* Index */}
      {item.index && (
        <span className="w-5 shrink-0 text-center text-sm text-gray-400 tabular-nums">
          {item.index}
        </span>
      )}

      {/* Album art */}
      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md">
        <img
          src={item.image}
          alt={item.title}
          width={40}
          height={40}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Title & artist */}
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
          {item.title}
        </span>
        <span className="truncate text-xs text-gray-500 dark:text-gray-400">
          {item.artist}
        </span>
      </div>

      {/* Duration */}
      {item.duration && (
        <span className="shrink-0 text-xs text-gray-400 tabular-nums">
          {item.duration}
        </span>
      )}
    </button>
  );
}
