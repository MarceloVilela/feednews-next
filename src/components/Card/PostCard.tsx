export type Item = {
  user: string;
  avatar: string;
  image: string;
  likes?: number;
  caption: string;
};

export type PostCardProps = {
  item: Item;
  onClick?: () => void;
};

export default function PostCard({ item, onClick }: PostCardProps) {
  return (
    <article className="w-full border-b border-gray-200 dark:border-white/10 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 overflow-hidden rounded-full">
            <img
              src={item.avatar}
              alt={item.user}
              width={32}
              height={32}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {item.user}
          </span>
        </div>
        <button
          aria-label="Mais opções"
          className="rounded-full p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          •••
        </button>
      </div>

      {/* Image */}
      <button
        onClick={onClick}
        className="w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <div className="aspect-square w-full overflow-hidden">
          <img
            src={item.image}
            alt={item.caption}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </button>

      {/* Footer */}
      <div className="px-3 pt-2">
        {item.likes && (
          <p className="mb-1 text-sm font-semibold text-gray-900 dark:text-gray-100">
            {item.likes} curtidas
          </p>
        )}
        <p className="text-sm text-gray-800 dark:text-gray-200">
          <span className="font-semibold">{item.user}</span>{" "}
          <span>{item.caption}</span>
        </p>
      </div>
    </article>
  );
}
