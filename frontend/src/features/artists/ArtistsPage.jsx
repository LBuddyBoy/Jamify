import { useArtist } from "../../context/ArtistContext";
import ArtistCard from "../../components/ArtistCard";
import "./style/artistsPage.css";

export default function ArtistsPage() {
  const { artists } = useArtist();

  return (
    <div className="artistsContainer">
      <header>
        <h1>Artists</h1>
      </header>
      <p>Click to view an artist.</p>
      <div className="artistCards">
        {artists.map((artist) => {
          return <ArtistCard key={artist.id} artist={artist} />;
        })}
      </div>
    </div>
  );
}
