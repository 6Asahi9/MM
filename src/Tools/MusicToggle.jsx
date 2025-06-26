import React, { useEffect, useRef, useState } from "react";
import "./MusicToggle.css";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import oceanSound from "../assets/Music/ocean1.mp3";

const MusicToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <>
      <audio ref={audioRef} src={oceanSound} />
      <button
        className="floating-music-button"
        onClick={() => setIsPlaying(!isPlaying)}
        aria-label={isPlaying ? "Pause Ocean Music" : "Play Ocean Music"}
      >
        {isPlaying ? <FaVolumeUp size={30} /> : <FaVolumeMute size={30} />}
      </button>
    </>
  );
};

export default MusicToggle;
