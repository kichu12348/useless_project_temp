// backingAir.jsx
import { useState, useEffect } from 'react';
import styles from './BakingAir.module.css';

const airRecipes = [
  { name: "Cloud Cookies", time: 120, temp: 350, description: "Light and fluffy air pockets" },
  { name: "Breeze Bread", time: 180, temp: 375, description: "Swirled with morning dew" },
  { name: "Wind Waffles", time: 90, temp: 400, description: "Crispy atmospheric crunch" },
  { name: "Atmospheric Pie", time: 150, temp: 425, description: "Layers of stratospheric goodness" },
  { name: "Oxygen Rolls", time: 60, temp: 350, description: "Fresh breathable bites" },
  { name: "Mist Muffins", time: 75, temp: 365, description: "Foggy morning flavor" },
  { name: "Zephyr Zest Cake", time: 140, temp: 335, description: "Whispered with gentle breezes" },
  { name: "Sky High Soufflé", time: 45, temp: 375, description: "Elevated dining experience" },
  { name: "Cumulus Croissants", time: 95, temp: 385, description: "Floating layers of nothing" }
];


const BakingAir = () => {
  const [recipe, setRecipe] = useState(airRecipes[0]);
  const [temperature, setTemperature] = useState(350);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isBaking, setIsBaking] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [glowIntensity, setGlowIntensity] = useState(0);

  useEffect(() => {
    if (isBaking && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
        setGlowIntensity(prev => (prev + 1) % 100);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0 && isBaking) {
      setIsBaking(false);
      setIsDone(true);
    }
  }, [isBaking, timeLeft]);

  const startBaking = () => {
    setTimeLeft(recipe.time);
    setIsBaking(true);
    setIsDone(false);
    setTemperature(recipe.temp);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  //no smool screen
  if(window.innerWidth < 800){
    return (
      <div className={styles.container}>
        <p
        style={{
          textAlign: 'center',
        }}
        >
          You can't bake air on a smoll screen. Please resize your window to view this content. 🙂
        </p>
        </div>
    )
  }


  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>The Ethereal Bakery</h1>
        <p className={styles.subtitle}>Artisanal Air-Baked Delicacies</p>
        
        <div className={styles.recipeSelector}>
          <label>Select Your Air Recipe</label>
          <select 
            value={recipe.name}
            onChange={(e) => setRecipe(airRecipes.find(r => r.name === e.target.value))}
          >
            {airRecipes.map(r => (
              <option key={r.name} value={r.name}>{r.name}</option>
            ))}
          </select>
          <p className={styles.recipeDescription}>{recipe.description}</p>
        </div>
  
        <div className={styles.ovenContainer}>
          <div className={styles.oven}>
            <div 
              className={`${styles.window} ${isBaking ? styles.baking : ''} ${isDone ? styles.done : ''}`}
              style={{ '--glow-intensity': `${glowIntensity}%` }}
            >
              {isBaking && (
                <>
                  <div className={styles.airParticles} />
                  <div className={styles.heatWaves} />
                </>
              )}
              {isDone && <div className={styles.sparkles} />}
            </div>
            
            <div className={styles.controls}>
              <div className={styles.controlPanel}>
                <div className={styles.temperature}>
                  <span>Temperature</span>
                  <div className={styles.tempDisplay}>{temperature}°F</div>
                  <input
                    type="range"
                    min="200"
                    max="500"
                    value={temperature}
                    onChange={(e) => setTemperature(Number(e.target.value))}
                    disabled={isBaking}
                    className={styles.tempSlider}
                  />
                </div>
                
                <div className={styles.timer}>
                  <span>Time Remaining</span>
                  <div className={styles.timerDisplay}>
                    {formatTime(timeLeft)}
                  </div>
                </div>
              </div>
              
              <button 
                className={`${styles.startButton} ${isBaking ? styles.baking : ''}`}
                onClick={startBaking}
                disabled={isBaking}
              >
                {isDone ? '🌟 Bake Again' : isBaking ? 'Baking...' : '🔥 Start Baking'}
              </button>
            </div>
          </div>
        </div>
  
        {isDone && (
          <div className={styles.completion}>
            <h2>Your {recipe.name} is Ready!</h2>
            <p>{recipe.description}</p>
            <div className={styles.sparkleEmoji}>✨</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BakingAir;


