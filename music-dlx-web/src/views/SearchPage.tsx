import { useEffect, useState } from "react";
import SearchBar from "../components/cards/SearchBar";
import TrackCard from "../components/cards/TrackCard";
import PreviewModal from "../components/modals/PreviewModal";
import Section from "../components/sections/Section";
import { TracksSection } from "../components/sections/TracksSection";
import VideosSection from "../components/sections/VideosSection";
import { IAnyTrack } from "../models/track";
import { IVideo } from "../models/video";
import { useAlbumTracks } from "../services/albums";
import { useDownloads } from "../services/download";
import { useSearchTracks } from "../services/tracks";
import { useSearchVideos } from "../services/videos";

export default function SearchPage() {
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<IAnyTrack | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<IVideo | null>(null);

  const { downloads, downloadTrack, clearDownloads } = useDownloads();

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
          downloadedTracks={downloads
            .filter((download) => download.status === "finished")
            .map((download) => download.track)}
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
          downloadedTracks={downloads
            .filter((download) => download.status === "finished")
            .map((download) => download.track)}
          onSelect={setSelectedTrack}
        />
      )}
      {downloads.length > 0 && (
        <>
          <Section
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
          </Section>
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
        <aside className="fixed bottom-0 left-0 flex w-full flex-row-reverse gap-4 border-t bg-white p-4">
          <button
            onClick={() =>
              downloadTrack({
                track: selectedTrack,
                video: selectedVideo,
              })
            }
            className="rounded-lg bg-red-500 px-4 py-2 text-center font-semibold text-white hover:bg-red-400"
          >
            Descargar
          </button>
          <button
            onClick={() => setPreviewOpen(true)}
            className="rounded-lg px-4 py-2 text-center font-semibold text-red-500 hover:bg-red-100"
          >
            Previsualizar
          </button>
        </aside>
      )}
      {selectedVideo && previewOpen && (
        <PreviewModal
          video={selectedVideo.id}
          onClose={() => setPreviewOpen(false)}
        />
      )}
    </main>
  );
}
