// EndlessScroll.jsx
import React, { useEffect, useState } from 'react';
import styles from './EndlessScroll.module.css';

const messages = [
  "Still scrolling? Me-wow!",
  "Legend says the end is near... (it's not)",
  "This cat goes on fur-ever",
  "Paws for a moment... then keep scrolling",
  "You're purr-fectly committed to this",
  "Feline good about this endless journey?",
  "Meow meow meow... that means keep scrolling",
  "Cat.exe has stopped... just kidding!",
  "Warning: Side effects include paw fatigue",
  "Scroll scroll scroll your screen...",
  "This is your captain speaking: MORE SCROLLING",
  "Achievement unlocked: Eternal Scroller",
  "Plot twist: There's no end",
  "Keep calm and scroll on",
  "Your finger must be tired... CONTINUE!",
    "You're the cat's pajamas",
    "You've got cattitude",
    "You're the cat's meow",
    "You're purr-fect",
    "You're the cat's whiskers",
    "You're the cat's pyjamas",
    "You're the cat's miaow",
    "You're the cat's whiskers"
];

const EndlessScroll = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [catParts, setCatParts] = useState([]);
  const [displayedMessages, setDisplayedMessages] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
      
      // Add new cat parts as user scrolls
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrolledToBottom = position + windowHeight > documentHeight - 1000;
      
      if (scrolledToBottom) {
        addMoreContent();
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial content
    addMoreContent();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const addMoreContent = () => {
    const newMessage = messages[Math.floor(Math.random() * messages.length)];
    const newPart = {
      id: `${Date.now()}-${catParts.length}-${newMessage}-${Math.random()*1000}`,
      message: newMessage,
    };

    setCatParts(prev => [...prev, newPart]);
    setDisplayedMessages(prev => [...prev, newMessage]);
  };


  const hue = (scrollPosition / 10) % 360;

  return (
    <div 
      className={styles.container}
      style={{
        '--scroll-hue': `${hue}deg`,
      }}
    >
      <div className={styles.catContainer}>
        {/* Cat head - fixed at top */}
        <div className={styles.catHead}>
          <div className={styles.ears}>
            <div className={styles.ear}></div>
            <div className={styles.ear}></div>
          </div>
          <div className={styles.face}>
            <div className={styles.eyes}>
              <div className={styles.eye}></div>
              <div className={styles.eye}></div>
            </div>
            <div className={styles.nose}></div>
            <div className={styles.whiskers}>
              <div className={styles.whisker}></div>
              <div className={styles.whisker}></div>
              <div className={styles.whisker}></div>
              <div className={styles.whisker}></div>
              <div className={styles.whisker}></div>
              <div className={styles.whisker}></div>
            </div>
          </div>
        </div>

        {/* Infinite cat body segments */}
        {catParts.map((part, index) => (
          <div key={part.id} className={styles.catSegment}>
            <div className={styles.bodyPattern}></div>
            <div className={styles.message}>{part.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EndlessScroll;

