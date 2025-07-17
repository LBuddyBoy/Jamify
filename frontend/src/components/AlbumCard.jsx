import { useNavigate } from "react-router";
import "./style/albumCard.css";

export default function AlbumCard({ album }) {
    const navigate = useNavigate();

    return <div className="albumCard" onClick={() => navigate("/albums/" + album.id)}>
        <img src={album.thumbnail_url}/>
        <div className="albumCardInfo">
            <h2>{album.name}</h2>
            <span>{new Date(album.created_at).getFullYear() + " • " + album.artist.name}</span>
        </div>
    </div>;
}
