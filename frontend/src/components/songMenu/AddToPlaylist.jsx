import { useSong } from "../../context/SongContext";

export default function AddToPlaylist() {
  const { hoveringPlaylist, setHoveringPlaylist } = useSong();
  const handleMouseEnter = (event) => {
    if (hoveringPlaylist) return;

    const parent = event.target.closest(".songMenu");
    const rect = parent.getBoundingClientRect();
    const playlistMenuWidth = 220;
    const padding = 8;
    let x, y;

    if (rect) {
      if (rect.right + playlistMenuWidth + padding < window.innerWidth) {
        x = rect.right;
      } else {
        x = rect.left - playlistMenuWidth;
      }
      y = rect.top;
    } else {
      x = 0;
      y = 0;
    }

    if (x < padding) x = padding;
    if (y + 300 > window.innerHeight) y = window.innerHeight - 300;

    setHoveringPlaylist({
      x,
      y,
    });
  };

  return <p onMouseEnter={handleMouseEnter}>Add to playlist</p>;
}
