// rateMyAir.jsx
import { useState, useEffect } from 'react';
import styles from './RateMyAir.module.css';

const airMetrics = {
  productivitySmell: ["Smells like procrastination", "Getting things done energy", "CEO mindset aroma"],
  vibeEnergy: ["Chaotic good", "Slightly mysterious", "Oddly nostalgic", "Future memories"],
  imaginationDensity: ["Thick with creativity", "Light and dreamy", "Heavy thought particles"],
  moonAlignment: ["Perfect moon synergy", "Slight lunar disruption", "Cosmic interference"],
  timeTexture: ["Smooth as butter", "Crunchy minutes", "Fluid hour waves"],
};

const RateMyAir = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [ratings, setRatings] = useState(null);

  const generateRatings = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const newRatings = {};
      Object.keys(airMetrics).forEach(metric => {
        const options = airMetrics[metric];
        const randomValue = options[Math.floor(Math.random() * options.length)];
        const randomScore = Math.floor(Math.random() * 100) + 1;
        newRatings[metric] = { value: randomValue, score: randomScore };
      });
      setRatings(newRatings);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.particles}>
        {[...Array(20)].map((_, i) => (
          <div key={i} className={styles.particle} />
        ))}
      </div>
      
      <h1 className={styles.title}>Rate My Air™</h1>
      <p className={styles.subtitle}>Advanced Atmospheric Analysis Technology</p>

      <button 
        className={styles.analyzeButton}
        onClick={generateRatings}
        disabled={isAnalyzing}
      >
        {isAnalyzing ? 'Analyzing Air Particles...' : 'Analyze Room Air'}
      </button>

      {ratings && !isAnalyzing && (
        <div className={styles.results}>
          {Object.entries(ratings).map(([metric, data]) => (
            <div key={metric} className={styles.metricCard}>
              <h3>{metric.replace(/([A-Z])/g, ' $1').trim()}</h3>
              <div className={styles.score}>{data.score}%</div>
              <p>{data.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RateMyAir;