import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import axios from "../api/axios";

const PlaylistContext = createContext();

export function PlaylistProvider({ children }) {
  const fetchPlaylists = async () => {
    const res = await axios.get("/playlists");
    return res.data;
  };
  const { data: playlists, error, isError, isPending } = useQuery({
    queryKey: ["playlists"],
    queryFn: fetchPlaylists,
  });

  if (isPending) {
    return <span>Loading</span>;
  }

  if (isError) {
    return <span>Error: {error} </span>;
  }

  const exports = {
    playlists
  };

  return (
    <PlaylistContext.Provider value={exports}>
      {children}
    </PlaylistContext.Provider>
  );
}

export function usePlaylist() {
  const context = useContext(PlaylistContext);

  if (!context)
    throw new Error("usePlaylist must be used within PlaylistContext");

  return context;
}
