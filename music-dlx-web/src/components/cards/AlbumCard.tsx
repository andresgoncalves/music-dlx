import { IAlbum, IAlbumResult } from "../../models/album";

interface AlbumCardProps {
  album: IAlbum | IAlbumResult;
}

export default function AlbumCard({ album }: AlbumCardProps) {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-lg bg-white shadow">
      <img
        className="aspect-square object-cover object-center"
        src={album.cover}
        alt={`"${album.title}" cover`}
      />
      <div className="absolute bottom-0 left-0 flex w-full flex-col justify-center bg-gradient-to-t from-black/75 to-black/0 p-4 pt-3 text-center font-medium text-white">
        <div className="text-lg">{album.title}</div>
        <div className="text-xs">{album.artist.name}</div>
      </div>
      {"year" in album && (
        <div className="absolute left-0 top-0 flex w-full flex-col justify-center bg-gradient-to-b from-black/75 to-black/0 p-4 pt-3 text-center font-medium text-white">
          <div>{album.year}</div>
        </div>
      )}
    </div>
  );
}
