import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import axios from "../../api/axios";
import ArtistSongs from "./components/ArtistSongs";
import ArtistAlbums from "./components/ArtistAlbums";

export default function ArtistPage() {
  const { id } = useParams();
  const {
    data: artist,
    isError,
    isPending,
    error,
  } = useQuery({
    queryKey: ["artist"],
    queryFn: async () => {
      return (await axios.get("/artists/" + id)).data;
    },
  });

  if (isPending || !artist) {
    return <span>Loading…</span>;
  }

  if (isError) {
    return <span>Error: {error?.message || error}</span>;
  }

  return (
    <div className="artistPage">
      <img src={artist.avatar_url} />
      <h1>{artist.name}</h1>
      <p>{artist.bio}</p>
      <ArtistSongs artist_id={id} />
      <ArtistAlbums artist_id={id} />
    </div>
  );
}
