// src/pages/auth/Login/components/slogan/Slogan.tsx

import React from 'react';
import styles from './Slogan.module.css';


const SloganComp: React.FC = () => (
  <div className={styles.sloganRoot}>
    <span className={styles.highlight}>“</span>
    信息化的目的是解放生产力而非来缚
    <span className={styles.highlight}>”</span>
  </div>
);

export default SloganComp;
