import React from 'react';
import styles from './Login.module.css';

import LoginForm from './components/loginForm/loginForm';
import SiteIntroduce from './components/SiteIntroduce/SiteIntroduce';
import Slogan from './components/Slogan/Slogan';

const Login: React.FC = () => {
  return (
    <div className={styles.loginPageRoot}>
      <div className={styles.mainArea}>
        {/* 网站介绍区：大屏显示，小屏隐藏 */}
        <div className={styles.siteIntroduceWrap}>
          <SiteIntroduce />
        </div>
        {/* slogan 区：小屏显示，大屏隐藏 */}
        <div className={styles.sloganWrap}>
          <Slogan />
        </div>
        {/* 登录表单区：始终显示 */}
        <div className={styles.loginFormWrap}>
          <LoginForm />
        </div>
      </div>
      {/* 页脚留空，方便后续添加 */}
      {/* <Footer /> */}
    </div>
  );
};

export default Login;
