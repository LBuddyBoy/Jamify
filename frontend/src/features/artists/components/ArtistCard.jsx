import { useNavigate } from "react-router";

export default function ArtistCard({ artist }) {
  const navigate = useNavigate();
  return (
    <div
      className="artistCard"
      onClick={() => navigate("/artists/" + artist.id)}
    >
      <img src={artist.avatar_url} />
      <h3>{artist.name}</h3>
    </div>
  );
}
