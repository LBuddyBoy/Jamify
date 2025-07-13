import express from "express";
import requireBody from "#middleware/requireBody";
import { createPlaylist, deletePlaylist, getPlaylistById, getPlaylists, updatePlaylist } from "#db/query/playlists";
const router = express.Router();
export default router;

router.get("/", async (req, res) => {
    res.status(200).json(await getPlaylists());
});

router.post("/", requireBody(["name"]), async (req, res) => {
  const playlist = await createPlaylist(req.body);

  if (!playlist) {
    return res.status(400);
  }

  res.status(201).json(playlist);
});

router.param('id', async (req, res, next, id) => {
    const playlist = await getPlaylistById(id);

    if (!playlist) return res.status(404).send("Couldn't find a playlist with that id.");

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

