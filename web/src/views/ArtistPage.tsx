import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DownloadBar from "../components/DownloadBar";
import TrackCard from "../components/cards/TrackCard";
import AlbumsSection from "../components/sections/AlbumsSection";
import ArtistSection from "../components/sections/ArtistSection";
import CardsSection from "../components/sections/CardsSection";
import { TracksSection } from "../components/sections/TracksSection";
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
import { useDownloads } from "../services/download";
import { useSearchVideos } from "../services/videos";

export default function ArtistPage() {
  const { id } = useParams();

  const artist = useArtist(parseInt(id ?? "0"));

  const [selectedAlbum, setSelectedAlbum] = useState<IAlbumResult | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<ITrackResult | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<IVideo | null>(null);

  const { downloads, downloadTrack, clearDownloads } = useDownloads();

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
          downloadedTracks={downloads
            .filter((download) => download.status === "finished")
            .map((download) => download.track)}
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
          downloadedTracks={downloads
            .filter((download) => download.status === "finished")
            .map((download) => download.track)}
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
      {downloads.length > 0 && (
        <>
          <CardsSection
            title="Cola de descarga"
            className="grid grid-cols-1 items-center gap-4 p-4 md:grid-cols-2 xl:grid-cols-3"
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
                      : () => {
                          setSelectedTrack(track);
                          setSelectedVideo(video);
                        }
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
      )}
      {selectedTrack && selectedVideo && (
        <DownloadBar track={selectedTrack} video={selectedVideo} />
      )}
    </main>
  );
}
