import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import axios from "../../api/axios";
import SongCard from "../../components/SongCard";
import "./style/playlistPage.css";
import { totalDuration } from "../../utils/utils";

export default function PlaylistPage() {
  const { id } = useParams();
  const {
    data: playlist,
    isError,
    isPending,
    error,
  } = useQuery({
    queryKey: ["playlist"],
    queryFn: async () => {
      return (await axios.get("/playlists/" + id)).data;
    },
  });

  if (isPending || !playlist) {
    return <span>Loading…</span>;
  }

  if (isError) {
    return <span>Error: {error?.message || error}</span>;
  }

  return (
    <div className="playlistInfoContainer">
      <header className="playlistHeader">
        <img
          src={playlist.image_url}
          alt={playlist.name + " playlist cover"}
        />
        <div className="playlistHeaderInfo">
          <h1 className="playlist-title">{playlist.name}</h1>
          <h2 className="playlist-owner">{playlist.owner || "EthanToups"}</h2>
          <div className="playlist-meta">
            <span>{playlist.songs.length} songs • {totalDuration(playlist.songs)}</span>
          </div>
        </div>
      </header>
      <div className="playlistSongs">
        {playlist.songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
}
