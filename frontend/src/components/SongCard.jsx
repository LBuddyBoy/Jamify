import { useEffect, useRef } from "react";
import { useSong } from "../context/SongContext";
import { secondsToMMSS } from "../utils/utils";
import "./style/songCard.css";
import SongMenu from "./SongMenu";
import { usePlaylist } from "../context/PlaylistContext";

export default function SongCard({ song, showListens = false }) {
  const { currentlyInteracting, setCurrentlyInteracting } = useSong();
  const { playlistMenuRef } = usePlaylist();
  const songRef = useRef();

  useEffect(() => {
    const handleRightClick = (event) => {
      if (
        event.button !== 2 ||
        !songRef.current ||
        !songRef.current.contains(event.target)
      ) {
        if (playlistMenuRef && playlistMenuRef.current && playlistMenuRef.current.contains(event.target)) return;

        setCurrentlyInteracting(null);
        return;
      }

      event.preventDefault();
      setCurrentlyInteracting({
        song,
        x: event.clientX,
        y: event.clientY,
      });

      console.log(" ");
      console.log("Showing ", song);
      console.log("X ", event.clientX);
      console.log("Y ", event.clientY);
    };

    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("mousedown", handleRightClick);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("mousedown", handleRightClick);
    };
  }, [playlistMenuRef, setCurrentlyInteracting, song]);

  const isInteracting =
    currentlyInteracting && currentlyInteracting.song.id === song.id;

  return (
    <>
      <div
        className={"songCard" + (isInteracting ? " active" : "")}
        ref={songRef}
      >
        <div className="songCardHeader">
          <ActionButton song={song} />
          <img src={song.thumbnail_url} />
          <h3>{song.title}</h3>
        </div>
        {showListens && <p>{song.listens}</p>}
        <p>{secondsToMMSS(song.duration)}</p>
      </div>
      {isInteracting && (
        <SongMenu x={currentlyInteracting.x} y={currentlyInteracting.y} />
      )}
    </>
  );
}

function ActionButton({ song }) {
  const { songPlaying, startPlaying, stopPlaying } = useSong();

  return (
    <>
      {songPlaying && songPlaying.id === song.id ? (
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          aria-label="music note"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => stopPlaying(song)}
        >
          <path
            d="M21 4v12.18A3.5 3.5 0 1 1 19 18V8h-8v10.18A3.5 3.5 0 1 1 9 18V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z"
            fill="currentColor"
          />
        </svg>
      ) : (
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          aria-label="play"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => startPlaying(song)}
        >
          <polygon points="10,7 22,14 10,21" fill="currentColor" />
        </svg>
      )}
    </>
  );
}
