import "../style/songMenu.css";
import PlaylistMenu from "../playlistMenu/PlaylistMenu";
import { useSong } from "../../context/SongContext";
import RemoveFromPlaylist from "./RemoveFromPlaylist";
import AddToPlaylist from "./AddToPlaylist";
import { useAuth } from "../../context/AuthContext";

export default function SongMenu({ x = 0, y = 0 }) {
  const { user } = useAuth();
  const { songMenuRef, hoveringPlaylist, setHoveringPlaylist } = useSong();
  const menuStyle = {
    left: x,
    top: y,
  };

  if (!user) return <></>;

  const handleEnter = () => {
    setHoveringPlaylist(null);
  };

  return (
    <>
      <div className="songMenu" style={menuStyle} ref={songMenuRef}>
        <AddToPlaylist />
        <p onMouseEnter={handleEnter}>Add to liked</p>
        <p onMouseEnter={handleEnter}>Add to queue</p>
        <RemoveFromPlaylist />
      </div>
      {hoveringPlaylist && (
        <PlaylistMenu
          x={hoveringPlaylist.x}
          y={hoveringPlaylist.y}
        ></PlaylistMenu>
      )}
    </>
  );
}
