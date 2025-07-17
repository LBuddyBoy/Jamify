import { useRef, useState } from "react";
import { usePlaylist } from "../../context/PlaylistContext";
import PlaylistCard from "./components/PlaylistCard";
import "./style/playlists.css";
import useClickOutside from "../../hooks/useClickOutside";
import { match } from "../../utils/utils";

export default function PlaylistsPage() {
  const { playlists } = usePlaylist();
  const [search, setSearch] = useState();
  const [showingSearch, setShowingSearch] = useState(false);
  const formRef = useRef();
  
  useClickOutside(formRef, () => {
    setShowingSearch(false);
  });

  const handleClick = () => {
    setShowingSearch((current) => !current);
  };

  const filtered = playlists.filter((playlist) => match(playlist.name, search));

  return (
    <div className="playlistsContainer">
      <header>
        <h1>Playlists</h1>
        {!showingSearch ? (
          <button className="playlistsQueryButton" onClick={handleClick}>🔍</button>
        ) : (
          <form className="playlistsQuery" ref={formRef}>
            <input
              type="text"
              name="search"
              placeholder="Search for a playlist 🔍"
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        )}
      </header>
      <p>Click to view a playlist.</p>
      <div className="playlistCards">
        {filtered.map((playlist) => {
          return <PlaylistCard key={playlist.id} playlist={playlist} />;
        })}
      </div>
    </div>
  );
}
