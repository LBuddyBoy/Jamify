import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import axios from "../../api/axios";

export default function ArtistPage() {
  const { id } = useParams();
  const {
    data: artist,
    isError,
    isPending,
    error,
  } = useQuery({
    queryKey: ["artists"],
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
      <ArtistSongs />
    </div>
  );
}

function ArtistSongs() {
  const { id } = useParams();
  const {
    data: songs,
    isError,
    isPending,
    error,
  } = useQuery({
    queryKey: ["artist_songs"],
    queryFn: async () => {
      return (await axios.get("/artists/" + id + "/songs")).data;
    },
  });

  if (isPending || !songs) {
    return <></>;
  }

  if (isError) {
    return <span>Error: {error?.message || error}</span>;
  }

  return (
    <div className="artistSongsContainer">
      <header>
        <h1>Songs</h1>
      </header>
      <div className="artistSongs">{songs.map((songs) => {
        return <div key={songs.id}></div>
      })}</div>
    </div>
  );
}
