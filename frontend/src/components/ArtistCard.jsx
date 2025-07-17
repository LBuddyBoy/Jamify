import { useNavigate } from "react-router";
import "./style/artistCard.css";

export default function ArtistCard({ artist }) {
  const navigate = useNavigate();
  
  return (
    <div
      className="artistCard"
      onClick={() => navigate("/artists/" + artist.id)}
    >
      <img src={artist.avatar_url} />
      <div className="artistCardInfo">
        <h3>{artist.name}</h3>
        <span>Artist</span>
      </div>
    </div>
  );
}
