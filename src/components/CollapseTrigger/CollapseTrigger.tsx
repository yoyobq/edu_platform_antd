// components/CollapseTrigger.tsx
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import styles from './CollapseTrigger.module.css';
import type { CollapseTriggerProps } from './types';

const CollapseTrigger: React.FC<CollapseTriggerProps> = ({
  collapsed,
  onToggle,
}) => {

  return (
    <Button
      className={styles.collapseTrigger}
      onClick={onToggle}
      type="default"
      shape="circle"
      size="small"
      icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
    />
  );
};

export default CollapseTrigger;
