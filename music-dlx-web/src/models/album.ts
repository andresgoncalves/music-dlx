import { IArtist, IArtistResult } from "./artist";

export interface IAlbum {
  id: number;
  title: string;
  release_date: string;
  year: number;
  genres: string[];
  artist: IArtist;
  cover: string;
}

export interface IAlbumResult {
  id: number;
  title: string;
  artist: IArtistResult;
  cover: string;
}
