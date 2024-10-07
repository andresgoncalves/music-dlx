import { ITrackResult } from "../../models/track";
import { IVideo } from "../../models/video";
import { useDownloads } from "../../services/download";
import TrackCard from "../cards/TrackCard";
import CardsSection from "./CardsSection";

interface DownloadsSectionProps {
  onSelect: ({ track, video }: { track: ITrackResult; video: IVideo }) => void;
}

export default function DownloadsSection({ onSelect }: DownloadsSectionProps) {
  const { downloads, downloadTrack, clearDownloads } = useDownloads();

  if (downloads.length === 0) {
    return null;
  }

  return (
    <>
      <CardsSection
        title="Cola de descarga"
        orientation="vertical"
        className="md:grid-cols-2 xl:grid-cols-3"
      >
        {downloads.map(({ track, video, status }, key) => (
          <div key={key}>
            <TrackCard
              track={track}
              status="downloaded"
              downloadStatus={status}
              onClick={
                status === "error"
                  ? () => downloadTrack({ track, video })
                  : () => onSelect?.({ track, video })
              }
            />
          </div>
        ))}
      </CardsSection>
      {downloads.length > 0 && (
        <div className="flex justify-center p-4">
          <button
            onClick={clearDownloads}
            className="rounded-lg px-4 py-2 text-center font-semibold text-red-500 hover:bg-red-100"
          >
            Borrar historial
          </button>
        </div>
      )}
    </>
  );
}
