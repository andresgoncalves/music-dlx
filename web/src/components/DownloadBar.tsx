import { useState } from "react";
import { Link } from "react-router-dom";
import { ITrackResult } from "../models/track";
import { IVideo } from "../models/video";
import { useDownloads } from "../services/download";
import PreviewModal from "./modals/PreviewModal";

interface DownloadBarProps {
  track?: ITrackResult;
  video?: IVideo;
}

export default function DownloadBar({ track, video }: DownloadBarProps) {
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);

  const { downloadTrack } = useDownloads();

  return (
    track && (
      <>
        <div className="fixed bottom-0 left-0 flex w-full gap-4 border-t bg-white p-4">
          <Link
            to={`/artist/${track.artist.id}`}
            className="mr-auto rounded-lg px-4 py-2 text-center font-semibold text-red-500 hover:bg-red-100 disabled:text-gray-500 disabled:hover:bg-transparent"
          >
            {track.artist.name}
          </Link>
          <button
            onClick={() => setPreviewOpen(true)}
            className="rounded-lg px-4 py-2 text-center font-semibold text-red-500 hover:bg-red-100 disabled:text-gray-500 disabled:hover:bg-transparent"
            disabled={video === undefined}
          >
            Previsualizar
          </button>
          <button
            onClick={
              video
                ? () =>
                    downloadTrack({
                      track,
                      video,
                    })
                : undefined
            }
            className="rounded-lg bg-red-500 px-4 py-2 text-center font-semibold text-white hover:bg-red-400 disabled:bg-gray-400"
            disabled={video === undefined}
          >
            Descargar
          </button>
        </div>
        {video && previewOpen && (
          <PreviewModal
            video={video.id}
            onClose={() => setPreviewOpen(false)}
          />
        )}
      </>
    )
  );
}
