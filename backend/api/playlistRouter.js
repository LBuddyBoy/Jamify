import express from "express";
import requireBody from "#middleware/requireBody";
import {
  createPlaylist,
  deletePlaylist,
  getPlaylistById,
  getPlaylists,
  getPlaylistsByName,
  updatePlaylist,
} from "#db/query/playlists";
import { addToPlaylist, getPlaylistSongs, removeFromPlaylist } from "#db/query/playlist_songs";
import { getSongById } from "#db/query/songs";
import { requireUser } from "#middleware/requireUser";

const router = express.Router();

router.use(requireUser);

router.get("/", async (req, res) => {
  res.status(200).json(await getPlaylists(req.user.id));
});

router.get("/:query/:limit/:offset", async (req, res) => {
  const { query, limit, offset } = query.param;

  res.status(200).json(await getPlaylistsByName(query, limit, offset));
});

router.post("/", requireBody(["name"]), async (req, res) => {
  const playlist = await createPlaylist(req.body);

  if (!playlist) {
    return res.status(400);
  }

  res.status(201).json(playlist);
});

router.param("id", async (req, res, next, id) => {
  const playlist = await getPlaylistById(id);

  if (!playlist)
    return res.status(404).send("Couldn't find a playlist with that id.");

  req.playlist = playlist;
  next();
});

router.get("/:id", async (req, res) => {
  res.status(200).json(req.playlist);
});

router.delete("/:id", async (req, res) => {
  res.status(204).json(await deletePlaylist(req.playlist.id));
});

router.put("/:id", async (req, res) => {
  const playlist = await updatePlaylist(req.playlist.id, req.body);
  res.status(200).json(playlist);
});

router.get("/:id/songs", async (req, res) => {
  res.status(200).json(await getPlaylistSongs(req.playlist.id));
});

router.param("songId", async (req, res, next, id) => {
  const song = await getSongById(id);

  if (!song) return res.status(404).send("Couldn't find a song with that id.");

  req.song = song;
  next();
});

router.post("/:id/songs/:songId", async (req, res) => {
  const playlist_song = await addToPlaylist({
    playlist_id: req.playlist.id,
    song_id: req.song.id,
  });

  res.status(200).json(playlist_song);
});

router.delete("/:id/songs/:songId", async (req, res) => {
  const playlist_song = await removeFromPlaylist({
    playlist_id: req.playlist.id,
    song_id: req.song.id,
  });

  if (!playlist_song) {
    return res.status(404).send("Couldn't find a song to delete.");
  }

  res.status(204);
});

export default router;
