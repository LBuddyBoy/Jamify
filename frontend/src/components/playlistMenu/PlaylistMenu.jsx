import "../style/playlistMenu.css";
import { useState } from "react";
import { match } from "../../utils/utils";
import { usePlaylist } from "../../context/PlaylistContext";
import PlaylistItem from "./PlaylistMenuItem";
import { useQuery } from "@tanstack/react-query";
import { fetchPlaylists } from "../../api/api";

export default function PlaylistMenu({ x, y }) {
  const { playlistMenuRef } = usePlaylist();
  const [search, setSearch] = useState(null);
  const {
    data: playlists,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["playlists"],
    queryFn: fetchPlaylists,
  });

  if (isError || isPending) return <></>;

  const filtered = playlists.filter((playlist) => match(playlist.name, search));

  return (
    <div
      className="playlistMenu"
      style={{
        left: x,
        top: y,
      }}
      ref={playlistMenuRef}
    >
      <div className="playlistMenuEdits">
        <input
          type="text"
          name="search"
          placeholder="Search for a playlist"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>+ New Playlist</button>
      </div>

      <ul className="playlistMenuPlaylists">
        {filtered.length === 0 ? (
          <li>No playlists found</li>
        ) : (
          filtered.map((playlist) => {
            return (
              <PlaylistItem
                key={playlist.id}
                playlist={playlist}
              ></PlaylistItem>
            );
          })
        )}
      </ul>
    </div>
  );
}
