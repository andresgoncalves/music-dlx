import { IAlbum, IAlbumResult } from "./album";
import { IArtist, IArtistResult } from "./artist";
import { ILyrics } from "./lyrics";

export interface ITrack {
  id: number;
  title: string;
  album: IAlbum;
  artist: IArtist;
  contributors: IArtist[];
  duration: number;
  disk_number: number;
  track_number: number;
  release_date: string;
  lyrics?: ILyrics;
}

export interface ITrackResult {
  id: number;
  title: string;
  album: IAlbumResult;
  artist: IArtistResult;
  duration: number;
}

export type IAnyTrack = ITrack | ITrackResult;
