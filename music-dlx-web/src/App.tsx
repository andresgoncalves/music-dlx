import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchPage from "./views/SearchPage";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SearchPage />
    </QueryClientProvider>
  );
}
