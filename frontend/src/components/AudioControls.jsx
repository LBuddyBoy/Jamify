import { useState } from "react";
import { useSong } from "../context/SongContext";
import { CiPause1, CiPlay1 } from "react-icons/ci";
import { RxSpeakerLoud, RxSpeakerOff } from "react-icons/rx";
import "./style/audioControls.css";

export default function AudioControls({ audio }) {
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const { songPlaying } = useSong();

  const handleMute = () => {
    if (audio.current.muted) {
      audio.current.muted = false;
      setMuted(false);
      return;
    }
    audio.current.muted = true;
    setMuted(true);
  };

  const handlePausePlay = () => {
    if (audio.current.paused) {
      audio.current.play();
      setPaused(false);
      return;
    }
    audio.current.pause();
    setPaused(true);
  };

  const handleVolume = (event) => {
    audio.current.volume = Number(event.target.value);
  };

  const handleTime = (event) => {
    audio.current.currentTime = Number(event.target.value);
  };

  return (
    <div className="audioControls">
      <div className="middleControls">
        {paused ? (
          <CiPlay1 className="pausePlayBtn" onClick={handlePausePlay}></CiPlay1>
        ) : (
          <CiPause1
            className="pausePlayBtn"
            onClick={handlePausePlay}
          ></CiPause1>
        )}

        <input
          type="range"
          min={0.1}
          max={songPlaying.duration}
          step={0.01}
          defaultValue={0.0}
          className="timeSlider"
          onInput={handleTime}
        />
      </div>
      <div className="rightControls">
        {muted ? (
          <RxSpeakerOff
            className="mutedUnmuteBtn"
            onClick={handleMute}
          ></RxSpeakerOff>
        ) : (
          <RxSpeakerLoud
            className="mutedUnmuteBtn"
            onClick={handleMute}
          ></RxSpeakerLoud>
        )}
        <input
          type="range"
          min={0.1}
          max={1.0}
          step={0.01}
          defaultValue={0.25}
          className="volumeSlider"
          onInput={handleVolume}
        />
      </div>
    </div>
  );
}
