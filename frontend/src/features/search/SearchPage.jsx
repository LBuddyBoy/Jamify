import { useQuery } from "@tanstack/react-query";
import axios from "../../api/axios";
import { useParams } from "react-router";
import SongCard from "../../components/SongCard";
import ArtistCard from "../../components/ArtistCard";
import AlbumCard from "../../components/AlbumCard";
import "./style/searchPage.css";

export default function SearchPage() {
  const { query } = useParams();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      return (
        await axios.post("/search/" + query, {
          artistsOffset: 0,
          songsOffset: 0,
          albumsOffset: 0,
        })
      ).data;
    },
  });

  if (isPending || !data) return <>Loading...</>;
  if (isError) return <>{error}</>;

  console.log(data);

  return (
    <div className="searchContainer">
      <Songs songs={data.songs} />
      <Artists artists={data.artists} />
      <Albums albums={data.albums} />
    </div>
  );
}

function Artists({ artists }) {
  return (
    <div className="artistContainer">
      <header>
        <h1>Artists</h1>
      </header>
      <div className="artistCards">
        {artists.length == 0 ? (
          <>No results found.</>
        ) : (
          artists.map((artist) => {
            return <ArtistCard key={artist.id} artist={artist} />;
          })
        )}
      </div>
    </div>
  );
}

function Albums({ albums }) {
  return (
    <div className="albumsContainer">
      <header>
        <h1>Albums</h1>
      </header>
      <div className="albumCards">
        {" "}
        {albums.length == 0 ? (
          <>No results found.</>
        ) : (
          albums.map((album) => {
            return <AlbumCard key={album.id} album={album} />;
          })
        )}
      </div>
    </div>
  );
}

function Songs({ songs }) {
  return (
    <div className="songContainer">
      <header>
        <h1>Songs</h1>
      </header>

      <div className="songCards">
        {songs.length == 0 ? (
          <>No results found.</>
        ) : (
          songs.map((song) => {
            return <SongCard key={song.id} song={song}></SongCard>;
          })
        )}
      </div>
    </div>
  );
}
