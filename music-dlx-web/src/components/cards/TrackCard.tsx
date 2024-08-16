import { TDownloadStatus } from "../../models/download";
import { IAnyTrack } from "../../models/track";
import { cn } from "../../utils/cn";

interface TrackCardProps {
  track: IAnyTrack;
  status?: "normal" | "downloaded" | "selected";
  downloadStatus?: TDownloadStatus;
  onClick?: () => void;
}

const downloadStatusTexts = {
  pending: "Pendiente",
  finished: "Completado",
  error: "Reintentar",
};

export default function TrackCard({
  track,
  status = "normal",
  downloadStatus,
  onClick,
}: TrackCardProps) {
  return (
    <button
      className={cn(
        "flex w-full items-center overflow-hidden rounded-xl bg-white text-start outline-red-500 hover:outline",
        status === "selected" && "outline outline-2",
        downloadStatus === "finished" && "outline outline-2 outline-green-500",
      )}
      onClick={onClick}
    >
      <img
        src={track.album.cover}
        alt={`${track.album.title} cover`}
        className="h-[120px] w-[120px] rounded-xl"
      />
      <div className="flex w-full flex-1 flex-col gap-1 break-words px-4 py-2">
        <div className="text-base">{track.title}</div>
        <div className="text-sm">{track.album.title}</div>
        <div className="text-sm">{track.artist.name}</div>
      </div>
      {downloadStatus && (
        <div
          className={cn(
            "flex-0 p-4 pl-0 text-sm font-semibold max-[480px]:text-xs",
            downloadStatus === "pending" && "text-gray-500",
            downloadStatus === "finished" && "text-green-500",
            downloadStatus === "error" && "text-red-500",
          )}
        >
          {downloadStatusTexts[downloadStatus]}
        </div>
      )}
    </button>
  );
}
