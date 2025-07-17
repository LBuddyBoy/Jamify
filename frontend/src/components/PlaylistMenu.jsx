import "./style/playlistMenu.css";
import { useState } from "react";
import { match } from "../utils/utils";
import { usePlaylist } from "../context/PlaylistContext";

export default function PlaylistMenu({ x, y }) {
  const { playlistMenuRef, playlists } = usePlaylist();
  const [search, setSearch] = useState(null);

  const filtered = playlists.filter((playlist) => match(playlist.name, search));

  return (
    <div
      className="playlistMenu"
      style={{
        position: "fixed",
        left: x,
        top: y,
        zIndex: 1000,
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
        {filtered.map((playlist) => {
          return (
            <PlaylistItem key={playlist.id} playlist={playlist}></PlaylistItem>
          );
        })}
      </ul>
    </div>
  );
}

function PlaylistItem({ playlist }) {
  return <li>{playlist.name}</li>;
}

//   const { currentlyInteracting } = useSong();
//   const queryClient = useQueryClient();
//   const mutation = useMutation({
//     mutationFn: async () => {
//       return await axios.post("/playlists/");
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["songs", "playlists", "playlist", "song", "search"],
//       });
//     },
//   });
