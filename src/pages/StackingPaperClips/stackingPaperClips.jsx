// StackingPaperClips.jsx
import { useState, useRef } from 'react';
import styles from './StackingPaperClips.module.css';

const StackingPaperClips = () => {
  const [clips, setClips] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem('clipHighScore')) || 0
  );

  const addClip = (x) => {
    if (gameOver) return;
    
    const newClip = {
      id: Date.now(),
      x: x - 25, // center the clip
      y: clips.length * 10,
      wobble: Math.random() * 2 - 1
    };

    setClips(prev => [...prev, newClip]);
    setScore(clips.length + 1);

    // Check if clips are too unstable (far from center)
    if (Math.abs(x - 400) > 150 && clips.length > 5) {
      gameOverHandler();
    }
  };

  const gameOverHandler = () => {
    setGameOver(true);
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('clipHighScore', score);
    }
  };

  const resetGame = () => {
    setClips([]);
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Paperclip Tower</h1>
        <div className={styles.scoreBoard}>
          <div>Height: {score}</div>
          <div>Best: {highScore}</div>
        </div>
      </div>

      <div 
        className={styles.gameArea}
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          addClip(x);
        }}
      >
        <div className={styles.base}></div>
        {clips.map((clip) => (
          <div
            key={clip.id}
            className={styles.paperclip}
            style={{
              left: `${clip.x}px`,
              bottom: `${clip.y}px`,
              transform: `rotate(${clip.wobble * 5}deg)`
            }}
          />
        ))}
      </div>

      {gameOver && (
        <div className={styles.gameOver}>
          <h2>Tower Collapsed!</h2>
          <p>Final Height: {score}</p>
          {score >= highScore && <p>New Record! 🏆</p>}
          <button onClick={resetGame}>Try Again</button>
        </div>
      )}

      <div className={styles.instructions}>
        Click to stack paperclips. Don't let them fall!
      </div>
    </div>
  );
};

export default StackingPaperClips;