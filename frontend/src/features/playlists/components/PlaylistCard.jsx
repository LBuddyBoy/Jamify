import { useNavigate } from "react-router";

export default function PlaylistCard({ playlist }) {
  const navigate = useNavigate();

  return (
    <div
      className="playlistCard"
      onClick={() => navigate("/playlists/" + playlist.id)}
    >
      <img src={playlist.image_url} />
      <div className="playlistCardInfo">
        <h4>{playlist.name}</h4>
        <p>Playlist • EthanToups</p>
      </div>
    </div>
  );
}
