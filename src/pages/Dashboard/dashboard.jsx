import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState({
    attempts: 0,
    rageMeter: 0,
    patience: 100,
    trollLevel: 1
  });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const generateFakeNotification = () => {
    const notifications = [
      "Your patience is decreasing... somehow",
      "Someone might have logged into your account (or not)",
      "You've achieved nothing! Congratulations! 🎉",
      "Your session will expire in -42 minutes",
      "Successfully failed to update your profile",
      "New achievement: Master of Confusion 🏆",
      "Warning: Too many warnings",
      "Error 404: Success not found",
      "Loading complete... just kidding!",
      "Your password was changed (in a parallel universe)"
    ];
    return notifications[Math.floor(Math.random() * notifications.length)];
  };

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, Math.random() * 3000);

    // Random notifications
    const notifInterval = setInterval(() => {
      setNotifications(prev => {
        const newNotif = generateFakeNotification();
        return [newNotif, ...prev].slice(0, 5);
      });
    }, 5000);

    // Random stats changes
    const statsInterval = setInterval(() => {
      setStats(prev => ({
        attempts: prev.attempts + Math.floor(Math.random() * 10),
        rageMeter: Math.min(100, prev.rageMeter + Math.floor(Math.random() * 20)),
        patience: Math.max(0, prev.patience - Math.floor(Math.random() * 15)),
        trollLevel: prev.trollLevel + (Math.random() > 0.8 ? 1 : 0)
      }));
    }, 3000);

    // Random chart data
    const chartInterval = setInterval(() => {
      setChartData(prev => {
        const newData = [...prev, Math.random() * 100];
        return newData.slice(-10);
      });
    }, 2000);

    return () => {
      clearInterval(notifInterval);
      clearInterval(statsInterval);
      clearInterval(chartInterval);
    };
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingText}>
          Loading
          <span className={styles.dot}>.</span>
          <span className={styles.dot}>.</span>
          <span className={styles.dot}>.</span>
        </div>
        <div className={styles.loadingSubtext}>
          (or maybe not)
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Welcome to Chaos™️
          <span className={styles.subtitle}>Where nothing makes sense</span>
        </h1>
        <button className={styles.logoutButton}>
          Maybe Logout?
        </button>
      </header>

      <div className={styles.content}>
        <div className={styles.statsContainer}>
          <div className={styles.statCard}>
            <h3>Rage Meter</h3>
            <div className={styles.progressBar}>
              <div 
                className={styles.progress} 
                style={{ width: `${stats.rageMeter}%` }}
              />
            </div>
            <span>{stats.rageMeter}%</span>
          </div>

          <div className={styles.statCard}>
            <h3>Patience Level</h3>
            <div className={styles.progressBar}>
              <div 
                className={styles.progress} 
                style={{ 
                  width: `${stats.patience}%`,
                  backgroundColor: '#4ecdc4'
                }}
              />
            </div>
            <span>{stats.patience}%</span>
          </div>

          <div className={styles.statCard}>
            <h3>Troll Level</h3>
            <div className={styles.trollLevel}>
              Level {stats.trollLevel}
              <span className={styles.levelBadge}>
                {stats.trollLevel < 5 ? 'Rookie' : 
                 stats.trollLevel < 10 ? 'Expert' : 'Master'}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.chartContainer}>
            <h3>Confusion Graph</h3>
            <div className={styles.chart}>
              {chartData.map((value, index) => (
                <div 
                  key={index}
                  className={styles.chartBar}
                  style={{ height: `${value}%` }}
                />
              ))}
            </div>
          </div>

          <div className={styles.notificationsContainer}>
            <h3>Maybe Important Notifications</h3>
            <div className={styles.notifications}>
              {notifications.map((notif, index) => (
                <div 
                  key={index}
                  className={styles.notification}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {notif}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;