// src/pages/auth/Login/components/slogan/Slogan.tsx

import React from 'react';
import styles from './Slogan.module.css';


const SloganComp: React.FC = () => (
  <div className={styles.sloganRoot}>
    <span className={styles.highlight}>"</span>
    <div className={styles.textContainer}>
      <div className={styles.firstLine}>
        信息化的目的是<span className={styles.keyWord}>解放</span>
      </div>
      <div className={styles.secondLine}>
        而非<span className={styles.keyWord}>束缚</span>生产力
      </div>
    </div>
    <span className={styles.highlight}>"</span>
  </div>
);

export default SloganComp;
