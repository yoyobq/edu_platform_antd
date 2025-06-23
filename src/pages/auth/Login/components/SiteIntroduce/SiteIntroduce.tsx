// src/pages/auth/Login/components/siteIntroduce/SiteIntroduceComp.tsx

import {
  SafetyCertificateOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons';
import React from 'react';
import styles from './SiteIntroduce.module.css';

const SiteIntroduceComp: React.FC = () => {
  return (
    <div className={styles.siteIntroduceRoot}>
      <div className={styles.brandSection}>
        <img
          className={styles.logo}
          src="/logo192.png" // 替换为你项目 logo
          alt="Logo"
        />
        <div className={styles.title}>智能平台</div>
        <div className={styles.subtitle}>让信息化服务于每一位师生</div>
      </div>
      <ul className={styles.introList}>
        <li>
          <UserOutlined className={styles.icon} />
          <div className={styles.label}>学生自助</div>
          <div className={styles.desc}>查成绩、查课表、填问卷，全部一站式搞定</div>
        </li>
        <li>
          <TeamOutlined className={styles.icon} />
          <div className={styles.label}>教师高效</div>
          <div className={styles.desc}>工作量自动统计、日志批量生成、教学任务透明高效</div>
        </li>
        <li>
          <SafetyCertificateOutlined className={styles.icon} />
          <div className={styles.label}>数据安全</div>
          <div className={styles.desc}>信息安全隔离，严格分权，师生数据各自独立</div>
        </li>
      </ul>
      <div className={styles.tips}>平台持续改进中，欢迎反馈建议！</div>
    </div>
  );
};

export default SiteIntroduceComp;
