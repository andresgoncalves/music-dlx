import { IArtist } from "../../models/artist";

interface ArtistSectionProps {
  artist: IArtist;
}

export default function ArtistSection({ artist }: ArtistSectionProps) {
  return (
    <section className="flex items-center gap-4 p-4 max-lg:flex-col">
      <div>
        <img
          className="h-auto w-full max-w-xs rounded object-contain"
          src={artist.picture}
          alt={`${artist.name} picture`}
        />
      </div>
      <div className="flex-1 text-center text-4xl font-semibold max-lg:text-2xl">
        {artist.name}
      </div>
    </section>
  );
}
