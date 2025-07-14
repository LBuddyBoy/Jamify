import { useSong } from "../../../context/SongContext";
import { secondsToMMSS } from "../../../utils/utils";

export default function SongCard({ song }) {
  return (
    <div className="songCard">
      <div className="songCardHeader">
        <ActionButton song={song} />
        <img src={song.thumbnail_url} />
        <h3>{song.title}</h3>
      </div>
      <p>{secondsToMMSS(song.duration)}</p>
    </div>
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
