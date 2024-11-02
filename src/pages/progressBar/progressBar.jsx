import React, { useState, useEffect } from 'react';
import styles from './PointlessProgressBars.module.css';

const PointlessProgressBars = () => {
  const [progress1, setProgress1] = useState(0);
  const [progress2, setProgress2] = useState(0);
  const [progress3, setProgress3] = useState(0);
  const [progress4, setProgress4] = useState(0);
  const [progress5, setProgress5] = useState(0);


  useEffect(() => {
    const timer = setInterval(() => {
      setProgress1(prev => {
        if (prev < 99) return prev + 1;
        return 99;
      });
    }, 50);
    return () => clearInterval(timer);
  }, []);


  useEffect(() => {
    const timer = setInterval(() => {
      setProgress2(prev => {
        const next = prev + Math.random() * 15 - 5;
        return Math.min(Math.max(next, 0), 100);
      });
    }, 200);
    return () => clearInterval(timer);
  }, []);


  useEffect(() => {
    const timer = setInterval(() => {
      setProgress3(prev => {
        if (prev >= 90) return 0;
        return prev + 1;
      });
    }, 100);
    return () => clearInterval(timer);
  }, []);


  useEffect(() => {
    let goingForward = true;
    const timer = setInterval(() => {
      setProgress4(prev => {
        if (prev >= 100) goingForward = false;
        if (prev <= 0) goingForward = true;
        return goingForward ? prev + 2 : prev - 2;
      });
    }, 50);
    return () => clearInterval(timer);
  }, []);

  
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress5(prev => {
        const jump = Math.random() > 0.7 ? 20 : 2;
        return Math.min(prev + jump, 100);
      });
    }, 300);
    return () => clearInterval(timer);
  }, []);

  const renderBar = (progress, label, progressBarClass) => (
    <div className={styles.barContainer}>
      <div className={styles.barHeader}>
        <span className={styles.barLabel}>{label}</span>
        <span className={styles.barLabel}>{Math.round(progress)}%</span>
      </div>
      <div className={styles.progressWrapper}>
        <div
          className={`${styles.progressBar} ${styles[progressBarClass]}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className={styles.center}>
    <div className={styles.container}>
      <h1 className={styles.title}>Pointless Progress Bars</h1>
      {renderBar(progress1, "The 'Almost There' Bar", 'almostThere')}
      {renderBar(progress2, "The 'Two Steps Forward, One Step Back' Bar", 'twoSteps')}
      {renderBar(progress3, "The 'Reset at 90%' Bar", 'reset')}
      {renderBar(progress4, "The 'Indecisive' Bar", 'indecisive')}
      {renderBar(progress5, "The 'Random Jumps' Bar", 'randomJumps')}
      <p className={styles.footer}>
        Warning: These progress bars may cause mild frustration and entertainment
      </p>
    </div>
    </div>
  );
};

export default PointlessProgressBars;