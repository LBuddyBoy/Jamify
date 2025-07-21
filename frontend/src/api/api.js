import axios from "./axios";

export const fetchPlaylists = async () => {
  const res = await axios.get("/playlists");

  console.log(res.data);

  return res.data;
};

export const fetchArtistAlbums = async (artistId) => {
  const response = await axios.get("/artists/" + artistId + "/albums");

  return response.data;
}

export const fetchArtistSongs = async (artistId) => {
  const response = await axios.get("/artists/" + artistId + "/songs");

  return response.data;
}

export const addListenToSong = async (songId) => {
  const response = await axios.get("/songs/" + songId + "/listened");

  return response.data;
}

export const addSongToPlaylist = async (playlistId, songId) => {
  return await axios
    .post(`/playlists/${playlistId}/songs/${songId}`)
    .catch((error) => {
      if (error.response.status === 400) {
        return {
          error: "That playlist already has this song.",
          success: false,
        };
      }
      throw error;
    });
};
