import { useQuery } from "@tanstack/react-query";
import { ISearch } from "../models/search";
import { IVideo } from "../models/video";
import { fetchApi } from "../utils/api";

export function useSearchVideos(params: { query: string | null }) {
  return useQuery({
    queryKey: ["search-videos", params],
    queryFn: () =>
      fetchApi<ISearch<IVideo>>(
        `/search/videos?${new URLSearchParams({
          query: params.query ?? "",
        })}`,
      ),
    enabled: params.query !== null,
  });
}
