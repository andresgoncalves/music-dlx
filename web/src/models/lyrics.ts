export interface ILyricsLine {
  line: string;
  timestamp: string;
  milliseconds: number;
  duration: number;
}

export interface ILyrics {
  text: string;
  sync_text: ILyricsLine[];
}
