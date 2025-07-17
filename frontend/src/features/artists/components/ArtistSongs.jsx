import { useQuery } from "@tanstack/react-query";
import axios from "../../../api/axios";
import SongCard from "../../../components/SongCard";

export default function ArtistSongs({ artist_id }) {
  const {
    data: songs,
    isError,
    isPending,
    error,
  } = useQuery({
    queryKey: ["artist_songs"],
    queryFn: async () => {
      return (await axios.get("/artists/" + artist_id + "/songs")).data;
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
        <h1>Popular</h1>
      </header>
      <div className="artistSongs">
        {songs.map((song) => {
          return <SongCard key={song.id} song={song} showListens={true} />;
        })}
      </div>
    </div>
  );
}
