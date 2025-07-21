import { useQuery } from "@tanstack/react-query";
import SongCard from "../../../components/SongCard";
import { fetchArtistSongs } from "../../../api/api";

export default function ArtistSongs({ artist_id }) {
  const {
    data: songs,
    isError,
    isPending,
    error,
  } = useQuery({
    queryKey: ["artist_songs"],
    queryFn: () => fetchArtistSongs(artist_id),
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
