import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import axios from "../api/axios";

const ArtistContext = createContext();

export function ArtistProvider({ children }) {
  const fetchArtists = async () => {
    const res = await axios.get("/artists");
    return res.data;
  };
  const { data: artists, error, isError, isPending } = useQuery({
    queryKey: ["artists"],
    queryFn: fetchArtists,
  });

  if (isPending) {
    return <span>Loading</span>;
  }

  if (isError) {
    return <span>Error: {error} </span>;
  }

  const exports = {
    artists
  };

  return (
    <ArtistContext.Provider value={exports}>
      {children}
    </ArtistContext.Provider>
  );
}

export function useArtist() {
  const context = useContext(ArtistContext);

  if (!context)
    throw new Error("useArtist must be used within ArtistContext");

  return context;
}
