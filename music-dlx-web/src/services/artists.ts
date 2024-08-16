import { useQuery } from "@tanstack/react-query";
import { IArtist, IArtistResult } from "../models/artist";
import { ISearch } from "../models/search";
import { fetchApi } from "../utils/api";

export function useArtist(id: number | null) {
  return useQuery({
    queryKey: ["artist", id],
    queryFn: () => fetchApi<IArtist>(`/artist/${encodeURIComponent(id ?? "")}`),
    enabled: id !== null,
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
