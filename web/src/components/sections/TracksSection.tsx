import { ISearch } from "../../models/search";
import { ITrackResult } from "../../models/track";
import TrackCard from "../cards/TrackCard";
import CardsSection from "./CardsSection";

interface TrackSectionProps {
  type?: "tracks" | "album-tracks";
  tracks: ISearch<ITrackResult>;
  selectedTrack?: ITrackResult;
  downloadedTracks?: ITrackResult[];
  onSelect: (video: ITrackResult) => void;
}

export function TracksSection({
  type = "tracks",
  tracks,
  selectedTrack,
  downloadedTracks,
  onSelect,
}: TrackSectionProps) {
  return (
    <CardsSection title={type === "album-tracks" ? "Álbum" : "Canciones"}>
      {tracks.results.map((track) => (
        <div key={track.id} className="w-80">
          <TrackCard
            track={track}
            status={
              downloadedTracks?.some((item) => item.id === track.id)
                ? "downloaded"
                : selectedTrack?.id === track.id
                  ? "selected"
                  : "normal"
            }
            onClick={() => onSelect(track)}
          />
        </div>
      ))}
    </CardsSection>
  );
}
