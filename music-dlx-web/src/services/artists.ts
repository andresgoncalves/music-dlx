import { useQuery } from "@tanstack/react-query";
import { IAlbumResult } from "../models/album";
import { IArtist, IArtistResult } from "../models/artist";
import { ISearch } from "../models/search";
import { ITrackResult } from "../models/track";
import { fetchApi } from "../utils/api";

export function useArtist(id: number | null) {
  return useQuery({
    queryKey: ["artist", id],
    queryFn: () => fetchApi<IArtist>(`/artist/${encodeURIComponent(id ?? "")}`),
    enabled: id !== null,
  });
}

export function useArtistAlbums(params: {
  id: number | null;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["artist-albums", params],
    queryFn: () =>
      fetchApi<ISearch<IAlbumResult>>(
        `/artist/${encodeURIComponent(params.id ?? "")}/albums?${new URLSearchParams(
          {
            ...(params.page ? { page: `${params.page}` } : {}),
            ...(params.limit ? { limit: `${params.limit}` } : {}),
          },
        )}`,
      ),
    enabled: params.id !== null,
  });
}

export function useArtistTracks(params: {
  id: number | null;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["artist-tracks", params],
    queryFn: () =>
      fetchApi<ISearch<ITrackResult>>(
        `/artist/${encodeURIComponent(params.id ?? "")}/tracks?${new URLSearchParams(
          {
            ...(params.page ? { page: `${params.page}` } : {}),
            ...(params.limit ? { limit: `${params.limit}` } : {}),
          },
        )}`,
      ),
    enabled: params.id !== null,
  });
}

export function useSearchArtists(params: {
  query: string | null;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["search-artists", params],
    queryFn: () =>
      fetchApi<ISearch<IArtistResult>>(
        `/search/artists?${new URLSearchParams({
          query: params.query ?? "",
          ...(params.page ? { page: `${params.page}` } : {}),
          ...(params.limit ? { limit: `${params.limit}` } : {}),
        })}`,
      ),
    enabled: params.query !== null,
  });
}
