// Login.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [attemptCount, setAttemptCount] = useState(0);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  const messages = [
    "are you gaeeee ????",
    "Almost got it! 😎",
    "Too slow! 🏃‍♂️",
    "Not today! 🙅‍♂️",
    "Keep trying! 🎮",
    "So close! 🎯",
    "One more time! 🎲"
  ];

  const isFormValid = () => {
    return formData.username.trim() !== '' && formData.password.trim() !== '';
  };

  const moveButton = (clientX, clientY) => {
    if (!formRef.current || !buttonRef.current) return;
    

    const formRect = formRef.current.getBoundingClientRect();
    const buttonRect = buttonRef.current.getBoundingClientRect();

    // Calculate available space within form boundaries
    const maxX = formRect.width - buttonRect.width;
    const maxY = formRect.height - buttonRect.height;

    // Generate random position within form boundaries
    let newX = Math.random() * maxX;
    let newY = Math.random() * maxY;

    // Ensure button stays at least 50px away from cursor
    const distanceFromCursor = {
      x: clientX - formRect.left - newX,
      y: clientY - formRect.top - newY
    };

    if (Math.abs(distanceFromCursor.x) < 50 && Math.abs(distanceFromCursor.y) < 50) {
      newX = (distanceFromCursor.x > 0) ? newX - 100 : newX + 100;
      newY = (distanceFromCursor.y > 0) ? newY - 100 : newY + 100;

      // Keep within boundaries after adjustment
      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));
    }

    setButtonPosition({ x: newX, y: newY });
    
  };




  const handleMouseMove = (e) => {
    if (attemptCount >= 7 || !isFormValid()) return;
    moveButton(e.clientX, e.clientY);
  };

  const handleTouchStart = (e) => {
    if (attemptCount >= 7 || !isFormValid()) return;
    const touch = e.touches[0];
    moveButton(touch.clientX, touch.clientY);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      setMessage("Fill in all fields first! 😤");
      return;
    }

    setAttemptCount(prev => prev + 1);
    
    if (attemptCount < 7) {
      setMessage(messages[attemptCount]);
      return;
    }

    // Final submission
    setLoading(true);
    setMessage("Fine, you win! Logging in... 🎉");
    
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className={styles.loginContainer}>
      <form 
        ref={formRef}
        onSubmit={handleSubmit} 
        className={styles.loginForm}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
      >
        <h1 className={styles.title}>
          Try to Login{attemptCount < 7 ? " 😈" : " 😅"}
        </h1>
        
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({
              ...formData,
              username: e.target.value
            })}
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({
              ...formData,
              password: e.target.value
            })}
            className={styles.input}
          />
        </div>

        <button
          ref={buttonRef}
          type="submit"
          className={`${styles.loginButton} ${!isFormValid() ? styles.disabled : ''}`}
          style={{
            transform: `translate(${buttonPosition.x}px, ${buttonPosition.y}px)`,
            transition: attemptCount >= 7 ? 'none' : 'transform 1s ease'
          }}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {message && (
          <div className={styles.message}>
            {message}
          </div>
        )}

        <div className={styles.attemptCounter}>
          Attempts: {attemptCount}/7
        </div>
      </form>
    </div>
  );
};

export default Login;