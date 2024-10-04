import { IAlbumResult } from "../../models/album";
import { ISearch } from "../../models/search";
import AlbumCard from "../cards/AlbumCard";
import CardsSection from "./CardsSection";

interface AlbumsSectionProps {
  albums: ISearch<IAlbumResult>;
  selectedAlbum?: IAlbumResult;
  onSelect: (album: IAlbumResult) => void;
}

export default function AlbumsSection({
  albums,
  selectedAlbum,
  onSelect,
}: AlbumsSectionProps) {
  return (
    <CardsSection title="Álbums">
      {albums.results.map((album) => (
        <div key={album.id} className="w-60">
          <AlbumCard
            album={album}
            status={album.id === selectedAlbum?.id ? "selected" : "normal"}
            onClick={() => onSelect(album)}
          />
        </div>
      ))}
    </CardsSection>
  );
}
