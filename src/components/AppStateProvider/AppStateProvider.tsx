// src/components/AppStateProvider/AppStateProvider.tsx
import React, { createContext, useEffect, useState } from 'react';
import access from '../../access/rbac';
import type { AppState, CurrentUser } from './types';

export const AppStateContext = createContext<AppState | null>(null);

interface Props {
  children: React.ReactNode;
  overrideUser?: CurrentUser;
}

export const AppStateProvider: React.FC<Props> = ({ children, overrideUser }) => {
  const [state, setState] = useState<AppState | null>(null);

  useEffect(() => {
    if (overrideUser) {
      setState({
        currentUser: overrideUser,
        access: access({ accessGroup: overrideUser.accessGroup }),
      });
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

          setState({
            currentUser: safeUser,
            access: access({ accessGroup: safeUser.accessGroup }),
          });
        // });
    }
  }, [overrideUser]);

  if (!state) return <div>加载中...</div>; // 也可以返回 loading...

  return (
    <AppStateContext.Provider value={state}>
      {children}
    </AppStateContext.Provider>
  );
};
