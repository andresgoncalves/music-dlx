import { useQuery } from "@tanstack/react-query";
import { ISearch } from "../models/search";
import { ITrack, ITrackResult } from "../models/track";
import { fetchApi } from "../utils/api";

export function useTrack(id: number | null) {
  return useQuery({
    queryKey: ["track", id],
    queryFn: () =>
      fetchApi<ITrack>(`/api/track/${encodeURIComponent(id ?? "")}`),
    enabled: id !== null,
  });
}

export function useSearchTracks(params: {
  query: string | null;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["search-tracks", params],
    queryFn: () =>
      fetchApi<ISearch<ITrackResult>>(
        `/api/search/tracks?${new URLSearchParams({
          query: params.query ?? "",
          ...(params.page ? { page: `${params.page}` } : {}),
          ...(params.limit ? { limit: `${params.limit}` } : {}),
        })}`,
      ),
    enabled: params.query !== null,
  });
}
