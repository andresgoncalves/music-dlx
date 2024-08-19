import { IAlbum, IAlbumResult } from "../../models/album";
import { cn } from "../../utils/cn";

interface AlbumCardProps {
  album: IAlbum | IAlbumResult;
  status?: "normal" | "selected";
  onClick?: () => void;
}

export default function AlbumCard({
  album,
  status = "normal",
  onClick,
}: AlbumCardProps) {
  return (
    <button
      className={cn(
        "relative flex flex-col overflow-hidden rounded-lg bg-white shadow outline-1 outline-red-500 hover:outline",
        status === "selected" && "outline outline-2",
      )}
      onClick={onClick}
    >
      <img
        className="aspect-square object-cover object-center"
        src={album.cover}
        alt={`"${album.title}" cover`}
      />
      <div className="absolute bottom-0 left-0 flex w-full flex-col justify-center gap-1 bg-gradient-to-t from-black/75 to-black/0 p-4 pt-3 text-center font-medium text-white">
        <div className="text-lg">{album.title}</div>
        <div className="text-xs">{album.artist.name}</div>
      </div>
      {"year" in album && (
        <div className="absolute left-0 top-0 flex w-full flex-col justify-center bg-gradient-to-b from-black/75 to-black/0 p-4 pt-3 text-center font-medium text-white">
          <div>{album.year}</div>
        </div>
      )}
    </button>
  );
}
