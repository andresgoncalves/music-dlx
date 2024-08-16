import { ISearch } from "../../models/search";
import { IAnyTrack } from "../../models/track";
import TrackCard from "../cards/TrackCard";
import Section from "./Section";

interface TrackSectionProps {
  type?: "tracks" | "album-tracks";
  tracks: ISearch<IAnyTrack>;
  selectedTrack?: IAnyTrack;
  downloadedTracks?: IAnyTrack[];
  onSelect: (video: IAnyTrack) => void;
}

export function TracksSection({
  type = "tracks",
  tracks,
  selectedTrack,
  downloadedTracks,
  onSelect,
}: TrackSectionProps) {
  return (
    <Section title={type === "album-tracks" ? "Álbum" : "Canciones"}>
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
    </Section>
  );
}
