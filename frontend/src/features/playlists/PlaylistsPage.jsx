import { usePlaylist } from "../../context/PlaylistContext";
import PlaylistCard from "./components/PlaylistCard";
import "./style/playlists.css";

export default function PlaylistsPage() {
  const { playlists } = usePlaylist();

  return (
    <div className="playlistsContainer">
      <form>
        <input type="text" name="search" placeholder="Search" />
      </form>
      <div className="playlists">
        {playlists.map((playlist) => {
          return <PlaylistCard key={playlist.id} playlist={playlist} />;
        })}
      </div>
    </div>
  );
}
