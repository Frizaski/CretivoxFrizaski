"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import styles from "./MusicToggle.module.css";

const MUSIC_SOURCE = "/Audio/You%20Are%20the%20One.mp3";

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.22;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.pause();
    };
  }, []);

  const handleToggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      return;
    }

    try {
      await audio.play();
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <div className={styles.container}>
      <audio ref={audioRef} src={MUSIC_SOURCE} loop preload="none" />
      <button
        type="button"
        className={`${styles.toggle} ${isPlaying ? styles.playing : ""}`}
        onClick={handleToggle}
        aria-label={isPlaying ? "Matikan musik latar" : "Nyalakan musik latar"}
        aria-pressed={isPlaying}
        suppressHydrationWarning
      >
        {isPlaying ? <Volume2 size={15} /> : <VolumeX size={15} />}
        <span>Music {isPlaying ? "On" : "Off"}</span>
        <span className={styles.indicator} aria-hidden="true" />
      </button>
    </div>
  );
}
