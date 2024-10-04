import { createBrowserRouter } from "react-router-dom";
import ArtistPage from "./views/ArtistPage";
import SearchPage from "./views/SearchPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SearchPage />,
  },
  {
    path: "/artist/:id",
    element: <ArtistPage />,
  },
]);
