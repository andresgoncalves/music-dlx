import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DownloadBar from "../components/DownloadBar";
import AlbumsSection from "../components/sections/AlbumsSection";
import ArtistSection from "../components/sections/ArtistSection";
import DownloadsSection from "../components/sections/DownloadsSection";
import TracksSection from "../components/sections/TracksSection";
import VideosSection from "../components/sections/VideosSection";
import { IAlbumResult } from "../models/album";
import { ITrackResult } from "../models/track";
import { IVideo } from "../models/video";
import { useAlbumTracks } from "../services/albums";
import {
  useArtist,
  useArtistAlbums,
  useArtistTracks,
} from "../services/artists";
import { useSearchVideos } from "../services/videos";

export default function ArtistPage() {
  const { id } = useParams();

  const artist = useArtist(parseInt(id ?? "0"));

  const [selectedAlbum, setSelectedAlbum] = useState<IAlbumResult | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<ITrackResult | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<IVideo | null>(null);

  const tracks = useArtistTracks({
    id: artist.isSuccess ? artist.data.id : null,
  });
  const albums = useArtistAlbums({
    id: artist.isSuccess ? artist.data.id : null,
  });
  const albumTracks = useAlbumTracks(selectedAlbum ? selectedAlbum.id : null);
  const videos = useSearchVideos({
    query: selectedTrack
      ? `${selectedTrack.title} ${selectedTrack.artist.name}`
      : null,
  });

  useEffect(() => {
    setSelectedVideo(null);
  }, [selectedTrack]);

  return (
    <main className="mb-24">
      {artist.isSuccess && <ArtistSection artist={artist.data} />}
      {tracks.isSuccess && (
        <TracksSection
          type="tracks"
          tracks={tracks.data}
          selectedTrack={selectedTrack ?? undefined}
          onSelect={setSelectedTrack}
        />
      )}
      {albums.isSuccess && (
        <AlbumsSection
          albums={albums.data}
          selectedAlbum={selectedAlbum ?? undefined}
          onSelect={setSelectedAlbum}
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
      {videos.isSuccess && (
        <VideosSection
          videos={videos.data}
          selectedVideo={selectedVideo ?? undefined}
          onSelect={setSelectedVideo}
        />
      )}
      <DownloadsSection
        onSelect={({ track, video }) => {
          setSelectedTrack(track);
          setSelectedVideo(video);
        }}
      />
      {selectedTrack && selectedVideo && (
        <DownloadBar track={selectedTrack} video={selectedVideo} />
      )}
    </main>
  );
}
