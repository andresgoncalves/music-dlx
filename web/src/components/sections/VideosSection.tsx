import { ISearch } from "../../models/search";
import { IVideo } from "../../models/video";
import VideoCard from "../cards/VideoCard";
import CardsSection from "./CardsSection";

interface VideosSectionProps {
  videos: ISearch<IVideo>;
  selectedVideo?: IVideo;
  onSelect: (video: IVideo) => void;
}

export default function VideosSection({
  videos,
  selectedVideo,
  onSelect,
}: VideosSectionProps) {
  return (
    <CardsSection title="Videos">
      {videos.results.map((video) => (
        <div key={video.id} className="w-60">
          <VideoCard
            video={video}
            status={video.id === selectedVideo?.id ? "selected" : "normal"}
            onClick={() => onSelect(video)}
          />
        </div>
      ))}
    </CardsSection>
  );
}
