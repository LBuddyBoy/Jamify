import { useEffect, useState } from "react";
import { useSong } from "../context/SongContext";
import axios from "../api/axios";
import "./style/songPlaying.css";
import { useRef } from "react";
import AudioControls from "./AudioControls";

export default function SongPlaying() {
  const { songPlaying, stopPlaying } = useSong();
  const [audioURL, setAudioURL] = useState(null);
  const audio = useRef();

  useEffect(() => {
    const fetchAudio = async () => {
      if (!songPlaying) return;

      try {
        const res = await axios.get(`/songs/${songPlaying.id}/stream`);
        setAudioURL(res.data.url);
      } catch (error) {
        setAudioURL(null);
        console.log(error);
      }
    };

    fetchAudio();
  }, [songPlaying]);

  useEffect(() => {
    if (audio.current) {
      console.log(audio.current);
      audio.current.volume = 0.1;
    }
  });

  if (!songPlaying || !audioURL) return null;

  return (
    <section className="song-playing-bar" role="complementary">
      <div className="song-playing-artwork">
        <img
          src={songPlaying.thumbnail_url}
          alt={songPlaying.title + " cover"}
          className="song-thumbnail"
        />
      </div>
      <div className="song-playing-info">
        <h3 className="song-title">{songPlaying.title}</h3>
        <audio
          ref={audio}
          src={audioURL}
          autoPlay
          className="audio-player"
          onEnded={() => stopPlaying()}
        />
      </div>

      <AudioControls audio={audio}></AudioControls>
    </section>
  );
}