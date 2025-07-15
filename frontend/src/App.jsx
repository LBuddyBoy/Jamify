import { Route, Routes } from "react-router";
import Layout from "./nav/Layout";
import Home from "./features/home/Home";
import PlaylistsPage from "./features/playlists/PlaylistsPage";
import PlaylistPage from "./features/playlists/PlaylistPage";
import ArtistsPage from "./features/artists/ArtistsPage";
import ArtistPage from "./features/artists/ArtistPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout></Layout>}>
        <Route index element={<Home />}/>
        <Route path="/artists" element={<ArtistsPage />}/>
        <Route path="/artists/:id" element={<ArtistPage />}/>
        <Route path="/playlists" element={<PlaylistsPage />}/>
        <Route path="/playlists/:id" element={<PlaylistPage />}/>
      </Route>
    </Routes>
  );
}
