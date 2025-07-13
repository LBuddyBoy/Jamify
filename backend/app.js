import express from "express";
import cors from "cors";
import morgan from "morgan";
import playlistRouter from "#api/playlistRouter";

const app = express();

app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(morgan("dev"));

app.use("/playlists", playlistRouter);

app.get("/", (req, res) => {
    res.send("Jamify Online ✅");
});

app.use((err, req, res, next) => {
  switch (err.code) {
    default:
      next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});


export default app;