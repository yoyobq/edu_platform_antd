// src/components/AppStateProvider/AppStateProvider.tsx
import React, { createContext, useEffect, useState } from 'react';
import access from '../../access/rbac';
import type { AppState, CurrentUser, Theme } from './types';

export const AppStateContext = createContext<AppState | null>(null);

interface Props {
  children: React.ReactNode;
  overrideUser?: CurrentUser;
}

export const AppStateProvider: React.FC<Props> = ({ children, overrideUser }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [theme, setTheme] = useState<Theme>(() => {
    // 从localStorage读取保存的主题，默认为light
    const savedTheme = localStorage.getItem('theme') as Theme;
    return savedTheme || 'light';
  });

  // 主题切换函数
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    // 更新document的data-theme属性，用于CSS变量切换
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    // 初始化时设置主题
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  useEffect(() => {
    if (overrideUser) {
      setCurrentUser(overrideUser);
    } else {
      // fetch('/api/currentUser')
      //   .then((res) => res.json())
      //   .then((user: CurrentUser) => {

          // 空用户 fallback
          const safeUser: CurrentUser = {
            id: 1,
            name: 'Alex',
            accessGroup: ['admin'], // 你想模拟哪个角色，就放哪个
          };

          // const safeUser = user?.accessGroup?.length ? user : fallbackUser;

          setCurrentUser(safeUser);
        // });
    }
  }, [overrideUser]);

  if (!currentUser) return <div>加载中...</div>; // 也可以返回 loading...

  const state: AppState = {
    currentUser,
    access: access({ accessGroup: currentUser.accessGroup }),
    theme,
    toggleTheme,
  };

  return (
    <AppStateContext.Provider value={state}>
      {children}
    </AppStateContext.Provider>
  );
};
