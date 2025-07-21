import { useState, createContext, useContext, useEffect, useRef } from "react";
import { usePlaylist } from "./PlaylistContext";

const SongContext = createContext();

export function SongProvider({ children }) {
  const [songPlaying, setSongPlaying] = useState(null);
  const [currentlyInteracting, setCurrentlyInteracting] = useState(null);
  const [hoveringPlaylist, setHoveringPlaylist] = useState(null);
  const { playlistMenuRef } = usePlaylist();
  const songMenuRef = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      if (
        playlistMenuRef.current &&
        playlistMenuRef.current.contains(event.target)
      ) {
        return;
      }
      if (songMenuRef.current && songMenuRef.current.contains(event.target)) {
        return;
      }

      setCurrentlyInteracting(null);
      setHoveringPlaylist(null);
    };

    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("mousedown", handleClick);
    };
  }, [playlistMenuRef, setCurrentlyInteracting]);

  const startPlaying = (song) => {
    setSongPlaying(song);
  };

  const stopPlaying = () => {
    setSongPlaying(null);
  };
  
  const value = {
    songMenuRef,
    hoveringPlaylist,
    setHoveringPlaylist,
    currentlyInteracting,
    setCurrentlyInteracting,
    songPlaying,
    stopPlaying,
    startPlaying,
  };

  return <SongContext.Provider value={value}>{children}</SongContext.Provider>;
}

export function useSong() {
  const context = useContext(SongContext);
  if (!context) throw new Error("useSong must be used within a SongProvider");
  return context;
}
