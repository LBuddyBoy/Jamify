import { useState, createContext, useContext } from "react";

const SongContext = createContext();

export function SongProvider({ children }) {
  const [songPlaying, setSongPlaying] = useState(null);
  const [currentlyInteracting, setCurrentlyInteracting] = useState(null);

  const startPlaying = (song) => {
    setSongPlaying(song);
  };

  const stopPlaying = () => {
    setSongPlaying(null);
  }

  const value = {
    currentlyInteracting,
    setCurrentlyInteracting,
    songPlaying,
    stopPlaying,
    startPlaying,
  };

  return <SongContext.Provider value={value}>
    {children}
    </SongContext.Provider>;
}

export function useSong() {
  const context = useContext(SongContext);
  if (!context) throw new Error("useSong must be used within a SongProvider");
  return context;
}
