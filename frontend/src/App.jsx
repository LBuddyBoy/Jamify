import { Route, Routes } from "react-router";
import Layout from "./nav/Layout";
import Home from "./features/home/Home";
import PlaylistsPage from "./features/playlists/PlaylistsPage";
import PlaylistPage from "./features/playlists/PlaylistPage";
import ArtistsPage from "./features/artists/ArtistsPage";
import ArtistPage from "./features/artists/ArtistPage";
import SearchPage from "./features/search/SearchPage";
import LoginPage from "./features/auth/LoginPage";
import RegisterPage from "./features/auth/RegisterPage";
import UserPage from "./features/auth/UserPage";
import RequireAuth from "./components/RequireAuth";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout></Layout>}>
        <Route index element={<Home />} />
        <Route element={<RequireAuth />}>
          <Route index path="/user" element={<UserPage />} />
          <Route path="/playlists" element={<PlaylistsPage />} />
        </Route>
        <Route index path="/register" element={<RegisterPage />} />
        <Route index path="/login" element={<LoginPage />} />
        <Route path="/search/:query" element={<SearchPage />} />
        <Route path="/artists" element={<ArtistsPage />} />
        <Route path="/artists/:id" element={<ArtistPage />} />
        <Route path="/playlists/:id" element={<PlaylistPage />} />
      </Route>
    </Routes>
  );
}
