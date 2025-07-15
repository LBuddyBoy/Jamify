import { useArtist } from "../../context/ArtistContext";
import ArtistCard from "./components/ArtistCard";

export default function ArtistsPage() {
  const { artists } = useArtist();

  return <div className="artistsContainer">
    {artists.map(artist => {
        return <ArtistCard key={artist.id} artist={artist}/>
    })};
  </div>
}
