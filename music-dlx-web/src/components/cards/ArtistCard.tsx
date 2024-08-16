import { IArtist, IArtistResult } from "../../models/artist";

interface ArtistCardProps {
  artist: IArtist | IArtistResult;
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-lg bg-white shadow">
      <img
        className="aspect-square object-cover object-center"
        src={artist.picture}
        alt={`"${artist.name}" picture`}
      />
      <div className="absolute bottom-0 left-0 flex w-full flex-col justify-center bg-gradient-to-t from-black/75 to-black/0 p-4 pt-3 text-center font-medium text-white">
        {artist.name}
      </div>
    </div>
  );
}
