import { useLocation } from "react-router";
import { useSong } from "../../context/SongContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../api/axios";

export default function RemoveFromPlaylist() {
  const location = useLocation();
  const playlistId = location.pathname.replace("/playlists/", "");
  const showRemove = location.pathname.startsWith("/playlists");
  const { setHoveringPlaylist, currentlyInteracting } = useSong();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      return await axios.delete(
        "/playlists/" + playlistId + "/songs/" + currentlyInteracting.song.id
      ).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playlist", playlistId] });
      queryClient.refetchQueries({ queryKey: ["playlist", playlistId] });
    },
  });

  if (!showRemove) return <></>;

  const handleEnter = () => {
    setHoveringPlaylist(null);
  };

  const handleClick = () => {
    mutation.mutate({});
    console.log("Clicking", playlistId);
  };

  return (
    <p onClick={handleClick} onMouseEnter={handleEnter}>
      Remove from playlist
    </p>
  );
}
