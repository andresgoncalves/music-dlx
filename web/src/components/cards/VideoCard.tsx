import { IVideo } from "../../models/video";
import { cn } from "../../utils/cn";

interface VideoCardProps {
  video: IVideo;
  status?: "normal" | "selected";
  onClick?: () => void;
}

export default function VideoCard({
  video,
  status = "normal",
  onClick,
}: VideoCardProps) {
  return (
    <button
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-xl text-start outline-1 outline-red-500 hover:outline",
        status === "selected" && "outline outline-2",
      )}
      onClick={onClick}
    >
      <img src={video.thumbnail} alt={video.title} className="rounded-xl" />
      <div className="flex w-full flex-col gap-2 break-words p-2">
        <div className="text-base">{video.title}</div>
        <div className="text-sm">{video.owner}</div>
      </div>
    </button>
  );
}
