export type Item = {
  image: string;
};

export type GridImageProps = {
  item: Item;
  onClick?: () => void;
};

export default function GridImage({ item, onClick }: GridImageProps) {
  return (
    <button
      onClick={onClick}
      className="aspect-square w-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <img
        src={item.image}
        alt=""
        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        loading="lazy"
      />
    </button>
  );
}
