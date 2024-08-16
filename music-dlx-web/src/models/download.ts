import { IAnyTrack } from "./track";
import { IVideo } from "./video";

export type TDownloadStatus = "finished" | "pending" | "error";

export interface IDownload {
  track: IAnyTrack;
  video: IVideo;
  status: TDownloadStatus;
}
