// src/hooks/useAppState.ts
import { useContext } from 'react';
import { AppStateContext } from '../components/AppStateProvider/AppStateProvider';
import { type AppState } from '../components/AppStateProvider/types';

export const useAppState = (): AppState => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('context 上下文读取出错，请检查 AppStateProvider 组件');
  }
  return context;
};
