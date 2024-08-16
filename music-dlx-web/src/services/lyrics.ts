import { useQuery } from "@tanstack/react-query";
import { ILyricsLine } from "../models/lyrics";
import { fetchApi } from "../utils/api";

export function useLyrics(id: number | null) {
  return useQuery({
    queryKey: ["lyrics", id],
    queryFn: () => fetchApi<string>(`/lyrics/${encodeURIComponent(id ?? "")}`),
    enabled: id !== null,
  });
}

export function useSyncLyrics(id: number | null) {
  return useQuery({
    queryKey: ["sync-lyrics", id],
    queryFn: () =>
      fetchApi<ILyricsLine[]>(`/sync-lyrics/${encodeURIComponent(id ?? "")}`),
    enabled: id !== null,
  });
}
