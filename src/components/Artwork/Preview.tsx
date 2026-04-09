//import Image from "next/image";

import { Card, CardDescription } from "@/components/ui/card";
import { AlbumArtworkProps } from "./AlbumArtwork";

export function Preview({
  data,
  className,
  ...props
}: AlbumArtworkProps) {
  return (
    <Card className="w-[150px] border-none" {...props}>
      <a
        href={`/post?url=${data.link}`}
        target="_blank"
        rel="noopener noreferrer"
        className="opacity-10"
      >
        <img
          //src='https://img.ibxk.com.br/2015/07/23/23170425700729.jpg?w=704'
          src={data.cover}
          /*fallbackSrc="https://i.ebayimg.com/images/g/~zsAAOSwej1fxobX/s-l300.jpg"*/
          /*fallbackSrc="https://th.bing.com/th/id/R.734ccc769a3de197fe8f8c322289a826?rik=ES5ZovP8S%2bKCwg&riu=http%3a%2f%2fwww.freeiconspng.com%2fuploads%2fblu-ray-icon-21.jpg&ehk=h%2baik6ZM4jRlTp9Z5KiN1YT34LSn6PrxQ5jSFKhRxGk%3d&risl=&pid=ImgRaw&r=0"*/
          /*layout="fill"*/
          alt={`Cover ${data.title}`}
          //className="h-[200px] object-cover opacity-5-"
          className="w-full"
        />
        <CardDescription className="text-sm-">{data.title}</CardDescription>
      </a>
    </Card>
  );
}
