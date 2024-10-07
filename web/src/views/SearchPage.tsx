import { useEffect, useState } from "react";
import DownloadBar from "../components/DownloadBar";
import SearchBar from "../components/SearchBar";
import DownloadsSection from "../components/sections/DownloadsSection";
import TracksSection from "../components/sections/TracksSection";
import VideosSection from "../components/sections/VideosSection";
import { ITrackResult } from "../models/track";
import { IVideo } from "../models/video";
import { useAlbumTracks } from "../services/albums";
import { useSearchTracks } from "../services/tracks";
import { useSearchVideos } from "../services/videos";

export default function SearchPage() {
  const [search, setSearch] = useState<string | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<ITrackResult | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<IVideo | null>(null);

  const tracks = useSearchTracks({ query: search });
  const videos = useSearchVideos({
    query: selectedTrack
      ? `${selectedTrack.title} ${selectedTrack.artist.name}`
      : null,
  });
  const albumTracks = useAlbumTracks(
    selectedTrack ? selectedTrack.album.id : null,
  );

  useEffect(() => {
    setSelectedVideo(null);
  }, [selectedTrack]);

  return (
    <main className="mb-24">
      <section className="p-8 pb-0">
        <SearchBar placeholder="Buscar canciones" onSearch={setSearch} />
      </section>
      {tracks.isSuccess ? (
        <TracksSection
          type="tracks"
          tracks={tracks.data}
          selectedTrack={selectedTrack ?? undefined}
          onSelect={setSelectedTrack}
        />
      ) : (
        <div className="px-8 py-32 text-center text-gray-500">
          Realice una búsqueda para empezar
        </div>
      )}
      {videos.isSuccess && (
        <VideosSection
          videos={videos.data}
          selectedVideo={selectedVideo ?? undefined}
          onSelect={setSelectedVideo}
        />
      )}
      {albumTracks.isSuccess && (
        <TracksSection
          type="album-tracks"
          tracks={albumTracks.data}
          selectedTrack={selectedTrack ?? undefined}
          onSelect={setSelectedTrack}
        />
      )}
      <DownloadsSection
        onSelect={({ track, video }) => {
          setSelectedTrack(track);
          setSelectedVideo(video);
        }}
      />
      <DownloadBar
        track={selectedTrack ?? undefined}
        video={selectedVideo ?? undefined}
      />
    </main>
  );
}
