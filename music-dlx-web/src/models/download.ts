import { ITrackResult } from "./track";
import { IVideo } from "./video";

export type TDownloadStatus = "finished" | "pending" | "error";

export interface IDownload {
  track: ITrackResult;
  video: IVideo;
  status: TDownloadStatus;
}
