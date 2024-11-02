import React, { useState } from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import styles from './InvisibleMuseum.module.css';

const InvisibleMuseum = () => {
  const [activeExhibit, setActiveExhibit] = useState(null);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  
  const exhibits = [
    {
      id: 1,
      title: "The Invisible Clock of Doom",
      description: "A timepiece so stealthy, even Time itself can't see it. Legend has it, it's always 5 minutes faster than any other clock, causing countless people to arrive embarrassingly early.",
      position: { top: '20%', left: '30%' },
      size: { width: 100, height: 100 }
    },
    {
      id: 2,
      title: "Ancient Transparent Artifact #47",
      description: "Discovered by accident when an archaeologist tripped over absolutely nothing. Carbon dating suggests it's from next Tuesday.",
      position: { top: '40%', left: '60%' },
      size: { width: 120, height: 80 }
    },
    {
      id: 3,
      title: "The Emperor's New Socks",
      description: "The lesser-known sequel to the famous clothing line. These socks are said to be extremely comfortable, though no one has ever actually felt them.",
      position: { top: '70%', left: '25%' },
      size: { width: 90, height: 90 }
    },
    {
      id: 4,
      title: "Invisible Ink (Unused)",
      description: "A bottle of premium invisible ink that's never been opened. Or has it? No one can tell.",
      position: { top: '30%', left: '75%' },
      size: { width: 70, height: 110 }
    },
    {
      id: 5,
      title: "The Ghost's Self-Portrait",
      description: "A masterpiece of invisible art. The ghost spent three years painting this self-portrait, only to realize they could have just used a blank canvas.",
      position: { top: '60%', left: '45%' },
      size: { width: 150, height: 100 }
    },{
        id:6,
        title: "The Invisible Hat",
        description: "A hat so stylish, it's said to make the wearer completely unnoticeable. Perfect for sneaking into exclusive parties or avoiding awkward conversations.",
        position: { top: '40%', left: '50%' },
        size: { width: 80, height: 80 }
    },
        {
            id: 7,
            title: "The Unseen Bridge",
            description: "A bridge that's rumored to connect two points in space without any visible structure. Many have walked over it without realizing.",
            position: { top: '15%', left: '85%' },
            size: { width: 120, height: 50 }
        },
        {
            id: 8,
            title: "The Vanishing Vase",
            description: "An exquisite vase that disappears every time someone tries to describe it.",
            position: { top: '50%', left: '10%' },
            size: { width: 80, height: 140 }
        },
        {
            id: 9,
            title: "The Ethereal Umbrella",
            description: "An umbrella that provides shelter from non-existent rain, especially useful on perfectly sunny days.",
            position: { top: '65%', left: '70%' },
            size: { width: 100, height: 100 }
        },
        {
            id: 10,
            title: "The Hidden Handbook",
            description: "A manual containing instructions on how to find things that cannot be seen.",
            position: { top: '25%', left: '40%' },
            size: { width: 90, height: 120 }
        },
        {
            id: 11,
            title: "The Silent Bell",
            description: "A bell that doesn't make a sound when rung. Highly praised in silent retreats.",
            position: { top: '80%', left: '55%' },
            size: { width: 70, height: 70 }
        }
  ];
  
  const [showIntro, setShowIntro] = useState(true);
  
  const handleExhibitClick = (exhibit, e) => {
    setActiveExhibit(exhibit);
    setClickPosition({ x: e.clientX, y: e.clientY });
  };
  
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      setActiveExhibit(null);
    }
  };
  //not supported on mobile
  if(window.innerWidth<768){
    return(
        <div className={styles.container}>
            <div className={styles.startScreen}>
                <h1 className={styles.title}>
                    The Museum of Invisible Things is not supported on mobile devices 😔
                </h1>
            </div>
        </div>
    )
  }

  return (
    <div className={styles.container} onClick={handleBackgroundClick}>
      <h1 className={styles.title}>
        History of Invisible Things
      </h1>
      
      {/* Museum Introduction Modal */}
      {showIntro && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <AlertTriangle className={styles.alertIcon} />
              <h2 className={styles.modalTitle}>Museum Guidelines</h2>
            </div>
            <p className={styles.modalText}>Welcome to the Museum of Invisible Things! Please note:</p>
            <div className={styles.warningContainer}>
                <p className={styles.warningText}>
                    <strong>Warning:</strong> Due to the nature of our exhibits, you may experience
                    moments of doubt about whether you're actually seeing anything at all. This is
                    completely normal.
                </p>
            </div>
            <ul className={styles.modalList}>
              <li>All exhibits are completely invisible</li>
              <li>Click around the museum space to discover hidden artifacts</li>
              <li>Each exhibit has a unique story waiting to be uncovered</li>
              <li>Please do not touch the invisible glass cases</li>
            </ul>
            <button 
              onClick={() => setShowIntro(false)}
              className={styles.modalButton}
            >
              Begin Tour
            </button>
          </div>
        </div>
      )}

      {/* Invisible Exhibits */}
      <div className={styles.museum}>
        {exhibits.map((exhibit) => (
          <div
            key={exhibit.id}
            className={styles.exhibit}
            style={{
              top: exhibit.position.top,
              left: exhibit.position.left,
              width: exhibit.size.width + 'px',
              height: exhibit.size.height + 'px',
            }}
            onClick={(e) => handleExhibitClick(exhibit, e)}
          />
        ))}
        
        {/* Info Icon Hint */}
        <div className={styles.hint}>
          <Info size={20} />
          <span>Click around to discover invisible exhibits</span>
        </div>

        {/* Exhibit Description Popup */}
        {activeExhibit && (
          <div
            className={styles.popup}
            style={{
              top: clickPosition.y + 'px',
              left: clickPosition.x + 'px',
            }}
          >
            <h3 className={styles.popupTitle}>{activeExhibit.title}</h3>
            <p className={styles.popupDescription}>{activeExhibit.description}</p>
          </div>
        )}
      </div>

      {/* Museum Info */}
      <div className={styles.footer}>
        <p>Curated by the Department of Invisible Studies</p>
        <p>Please maintain social distancing from invisible entities</p>
      </div>
    </div>
  );
};

export default InvisibleMuseum;