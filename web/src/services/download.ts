import { useCallback } from "react";
import { useLocalStorage } from "usehooks-ts";
import { IDownload } from "../models/download";
import { ITrackResult } from "../models/track";
import { IVideo } from "../models/video";
import { getApiUrl } from "../utils/api";

export async function downloadAudio({
  track,
  video,
}: {
  track: number;
  video: string;
}) {
  const url = getApiUrl(
    `/download/audio?${new URLSearchParams({
      track: `${track}`,
      video: video,
    })}`,
  );

  const res = await fetch(url, { method: "HEAD" });

  if (!res.ok) {
    throw new Error(`ApiError: ${res.status}`);
  }

  const anchor = document.createElement("a");
  anchor.style.display = "none";
  anchor.href = url.href;
  anchor.download = "true";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

export async function downloadLyrics({ track }: { track: number }) {
  const url = getApiUrl(
    `/download/lyrics?${new URLSearchParams({
      track: `${track}`,
    })}`,
  );

  const anchor = document.createElement("a");
  anchor.style.display = "none";
  anchor.href = url.href;
  anchor.download = "true";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

export function useDownloads() {
  const [downloads, setDownloads, clearDownloads] = useLocalStorage<
    IDownload[]
  >("downloads", []);

  const setDownload = useCallback(
    (download: IDownload) => {
      setDownloads((prevQueue: IDownload[]) => {
        const queue = [...prevQueue];

        const item = queue.find(
          (item) =>
            item.track.id === download.track.id &&
            item.video.id === download.video.id,
        );

        if (item) {
          item.status = download.status;
          return queue;
        }
        return [download, ...queue];
      });
    },
    [setDownloads],
  );

  const downloadTrack = useCallback(
    ({ track, video }: { track: ITrackResult; video: IVideo }) => {
      setDownload({ track, video, status: "pending" });
      downloadAudio({
        track: track.id,
        video: video.id,
      })
        .then(() => setDownload({ track, video, status: "finished" }))
        .catch(() => setDownload({ track, video, status: "error" }));
    },
    [setDownload],
  );

  return { downloads, downloadTrack, clearDownloads } as const;
}
