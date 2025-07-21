import { useSong } from "../context/SongContext";
import { getMenuPosition, secondsToMMSS } from "../utils/utils";
import "./style/songCard.css";
import SongMenu from "./songMenu/SongMenu";

export default function SongCard({ song, showListens = false }) {
  const { currentlyInteracting, setCurrentlyInteracting } = useSong();

  const handleRightClick = (event) => {
    const { x, y } = getMenuPosition(event.clientX, event.clientY, 180, 100);

    event.preventDefault();
    setCurrentlyInteracting({
      song,
      x: x,
      y: y,
    });
  };

  const isInteracting =
    currentlyInteracting && currentlyInteracting.song.id === song.id;

  return (
    <>
      <div
        className={"songCard" + (isInteracting ? " active" : "")}
        onAuxClick={handleRightClick}
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
