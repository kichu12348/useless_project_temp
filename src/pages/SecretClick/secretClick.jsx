import React, { useState, useEffect, useCallback, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import styles from "./SecretClick.module.css";
import rolls from "./audio/rolls.mp3";
import RICKROLL_VIDEO from "./audio/ricks.gif"

const SecretFind = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [found, setFound] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [imagePosition] = useState({
    x: Math.random() * (window.innerWidth - 200) + 100,
    y: Math.random() * (window.innerHeight - 200) + 100,
  });
  const [isImageVisible, setIsImageVisible] = useState(false);

  const audioRef = useRef(null);
  const videoRef = useRef(null);

  const handleMouseMove = useCallback(
    (e) => {
      if (!gameStarted) return;
      
      setMousePos({ x: e.clientX, y: e.clientY });

      const distance = Math.sqrt(
        Math.pow(e.clientX - imagePosition.x, 2) +
          Math.pow(e.clientY - imagePosition.y, 2)
      );

      setIsImageVisible(distance < 150);

      if (distance < 50 && isImageVisible && !found) {
        setFound(true);
        if (audioRef.current) {
          audioRef.current.play();
        }
      }
    },
    [imagePosition, found, isImageVisible, gameStarted]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    if (gameStarted && !found && startTime) {
      const timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameStarted, found, startTime]);

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setFound(false);
    window.location.reload();
  };

  const handleStart = () => {
    // Preload audio
    if (audioRef.current) {
      audioRef.current.load();
    }
    setGameStarted(true);
    setStartTime(Date.now());
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if(window.innerWidth < 800) {
    return (
      <div className={styles.container}>
        <div className={styles.startScreen}>
          <h1 className={styles.title}>This game is not supported on mobile devices</h1>
        </div>
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <div className={`${styles.container} ${styles.cursor}`}
      >
        <div className={styles.startScreen}>
          <h1 className={styles.title}>Find the Mysterious Treasure</h1>
          <button 
            onClick={handleStart}
            className={styles.startButton}
          >
            Start Game
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Find the mysterious treasure...</h1>

      <div className={styles.timeCounter}>Time: {formatTime(elapsedTime)}</div>

      <div
        className={styles.flashlight}
        style={{
          left: mousePos.x,
          top: mousePos.y,
        }}
      />

      <div
        className={`${styles.rickRollOverlay} ${found ? styles.visible : ""}`}
      >
        <div className={styles.rickRollContent}>
          <img
            ref={videoRef}
            src={RICKROLL_VIDEO}
            className={`${styles.secretImage} ${
              isImageVisible ? styles.visible : ""
            }`}
            style={{
              left: imagePosition.x - 30,
              top: imagePosition.y - 30,
            }}
            preload="auto"
          />
          <button className={styles.closeButton} onClick={handleClose}>
            Play Again
          </button>
        </div>
      </div>

      <audio ref={audioRef} loop muted={isMuted} preload="auto">
        <source src={rolls} type="audio/mp3" />
      </audio>
    </div>
  );
};

export default SecretFind;