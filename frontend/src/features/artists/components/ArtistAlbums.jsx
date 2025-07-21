import { useQuery } from "@tanstack/react-query";
import AlbumCard from "../../../components/AlbumCard";
import { fetchArtistAlbums } from "../../../api/api";

export default function ArtistAlbums({ artist_id }) {
  const {
    data: albums,
    error,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["artist_albums"],
    queryFn: () => fetchArtistAlbums(artist_id),
  });

  if (isPending || !albums) {
    return <></>;
  }

  if (isError) {
    return <span>Error: {error?.message || error}</span>;
  }

  return (
    <div className="artistAlbumsContainer">
      <header>
        <h1>Albums</h1>
      </header>
      <div className="artistAlbums">
        {albums.map((album) => {
          return <AlbumCard key={album.id} album={album} />;
        })}
      </div>
    </div>
  );
}
