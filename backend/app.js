import express from "express";
import cors from "cors";
import morgan from "morgan";
import playlistRouter from "#api/playlistRouter";
import songsRouter from "#api/songsRouter";
import artistsRouter from "#api/artistsRouter";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/playlists", playlistRouter);
app.use("/songs", songsRouter);
app.use("/artists", artistsRouter);

app.get("/", (req, res) => {
    res.send("Jamify Online ✅");
});

app.use((err, req, res, next) => {
  switch (err.code) {
    case "23505":
      return res.status(400).send(err.detail);
    default:
      next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});


export default app;