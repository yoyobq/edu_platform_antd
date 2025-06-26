// src/pages/auth/Login/components/siteIntroduce/SiteIntroduceComp.tsx

import React from 'react';
import styles from './SiteIntroduce.module.css';

// InfoCard 组件
interface InfoCardProps {
  title: string;
  index: number;
  desc: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, index, desc }) => {
  return (
    <div className={styles.infoCard}>
      <div className={styles.cardDecoration}></div>
      <div className={styles.infoCardHeader}>
        <div className={styles.infoCardIcon}>{index}</div>
        <div className={styles.infoCardTitle}>{title}</div>
      </div>
      <div className={styles.infoCardContent}>{desc}</div>
    </div>
  );
};

const SiteIntroduceComp: React.FC = () => {
  return (
    <div className={styles.siteIntroduceRoot}>
      <div className={styles.welcomeDecorationTop}></div>
      <div className={styles.welcomeDecorationBottom}></div>

      <div className={styles.welcomeContentContainer}>
        <div>
          <div className={styles.platformLogo}>
            <img src="/logo.svg" alt="平台Logo" />
            <span>智能教学平台</span>
          </div>

          <div className={styles.platformTitle}>欢迎使用 Edu Platform</div>
          <div className={styles.platformDescription}>
            <div style={{ marginBottom: 16 }}>
              Edu Platform
              是一个整合江苏省苏州技师学院内部信息，展示信息工程系技术实力，并示范如何真正利用计算机科学实现信息化的综合性智能平台。
            </div>
            <div>
              我们致力于提炼『教学』、『教育』和『教辅』工作中的典型业务场景，采用信息化手段优化工作流程，为『学生』、『教师』和『教工』提供便捷服务，提升处理和解决各类学校事务的体验。
            </div>
          </div>
        </div>

        <div className={styles.infoCardsContainer}>
          <InfoCard
            index={1}
            title="如果您是学生"
            desc="获取便捷的教学内容展示、专业问答、知识辅导，以及监测学习进度和成果的工具。"
          />
          <InfoCard
            index={2}
            title="如果您是教师"
            desc="规划、设计、展示您的教学内容，利用信息化工具减少重复劳动，专注于真正的教学服务。"
          />
          <InfoCard
            index={3}
            title="如果您是教工"
            desc="整合搜集学院各类信息并合理梳理，提供便捷的查看、搜索和处理功能。"
          />
        </div>
      </div>
    </div>
  );
};

export default SiteIntroduceComp;
