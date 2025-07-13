import { createContext, useContext } from "react";

const PlaylistContext = createContext();

export function PlaylistProvider({children}) {

    const exports = {

    };

    return <PlaylistContext.Provider value={exports}>{children}</PlaylistContext.Provider>
}

export function usePlaylist() {
    const context = useContext(PlaylistContext);

    if (!context) throw new Error("usePlaylist must be used within PlaylistContext");

    return context;
}