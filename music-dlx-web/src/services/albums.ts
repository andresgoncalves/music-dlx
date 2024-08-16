import { useQuery } from "@tanstack/react-query";
import { IAlbum, IAlbumResult } from "../models/album";
import { ISearch } from "../models/search";
import { ITrackResult } from "../models/track";
import { fetchApi } from "../utils/api";

export function useAlbum(id: number | null) {
  return useQuery({
    queryKey: ["album", id],
    queryFn: () => fetchApi<IAlbum>(`/album/${encodeURIComponent(id ?? "")}`),
    enabled: id !== null,
  });
}

export function useAlbumTracks(id: number | null) {
  return useQuery({
    queryKey: ["album-tracks", id],
    queryFn: () =>
      fetchApi<ISearch<ITrackResult>>(
        `/album/${encodeURIComponent(id ?? "")}/tracks`,
      ),
    enabled: id !== null,
  });
}

export function useSearchAlbums(params: {
  query: string | null;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["search-albums", params],
    queryFn: () =>
      fetchApi<ISearch<IAlbumResult>>(
        `/search/albums?${new URLSearchParams({
          query: params.query ?? "",
          ...(params.page ? { page: `${params.page}` } : {}),
          ...(params.limit ? { limit: `${params.limit}` } : {}),
        })}`,
      ),
    enabled: params.query !== null,
  });
}
