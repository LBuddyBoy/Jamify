import { useState } from "react";
import "./style/songMenu.css";
import PlaylistMenu from "./PlaylistMenu";

export default function SongMenu({ x = 0, y = 0 }) {
  const [hoveringPlaylist, setHoveringPlaylist] = useState(false);

  const handleEnter = () => {
    setHoveringPlaylist(false);
  };

  return (
    <>
      <div
        className="songMenu"
        style={{
          position: "fixed",
          left: x,
          top: y,
          zIndex: 1000,
        }}
      >
        <AddToPlaylist
          hoveringPlaylist={hoveringPlaylist}
          setHoveringPlaylist={setHoveringPlaylist}
        ></AddToPlaylist>
        <p onMouseEnter={handleEnter}>Add to liked</p>
        <p onMouseEnter={handleEnter}>Add to queue</p>
      </div>
      {hoveringPlaylist && <PlaylistMenu x={x + 175} y={y + 10}></PlaylistMenu>}
    </>
  );
}

function AddToPlaylist({ hoveringPlaylist, setHoveringPlaylist }) {
  const handleMouseEnter = () => {
    if (hoveringPlaylist) return;

    setHoveringPlaylist(true);
  };

  return <p onMouseEnter={handleMouseEnter}>Add to playlist</p>;
}
