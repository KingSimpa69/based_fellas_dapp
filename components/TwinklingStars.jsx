import React, { useEffect } from 'react';
import styles from '@/styles/TwinklingStars.module.css';

const TwinklingStars = () => {
    useEffect(() => {
      const generateStars = () => {
        const container = document.getElementById('stars-container');
        const numStars = 30; 
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        for (let i = 0; i < numStars; i++) {
          const star = document.createElement('div');
          star.classList.add(styles.star);
          const size = Math.random() * 3 + 2;
          star.style.width = `${size}px`;
          star.style.height = `${size}px`;
          star.style.left = `${Math.random() * containerWidth}px`;
          star.style.top = `${Math.random() * containerHeight}px`;
          star.style.animationDelay = `${Math.random() * 3}s`;
          container.appendChild(star);
        }
      };
  
      generateStars();
    }, []);
  
    return (
      <div id="stars-container" className={styles.starsContainer}>
          {}
      </div>
    );
  };
  
  export default TwinklingStars;