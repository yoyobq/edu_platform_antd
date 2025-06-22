// components/CollapseTrigger.tsx
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import React from 'react';
import styles from './CollapseTrigger.module.css';
import type { CollapseTriggerProps } from './types';

const CollapseTrigger: React.FC<CollapseTriggerProps> = ({
  collapsed,
  collapsedWidth = '3.75rem',
  expandedWidth = '15rem',
  onToggle,
}) => {
  const left = typeof (collapsed ? collapsedWidth : expandedWidth) === 'number'
    ? `${collapsed ? collapsedWidth : expandedWidth}px`
    : (collapsed ? collapsedWidth : expandedWidth);

  return (
    <div
      className={styles.collapseTrigger}
      style={{ left }}
      onClick={onToggle}
    >
      {collapsed ? <RightOutlined /> : <LeftOutlined />}
    </div>
  );
};

export default CollapseTrigger;
