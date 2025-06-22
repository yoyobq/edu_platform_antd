// src/main.tsx
import { ConfigProvider, theme } from 'antd';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { AppStateProvider } from './components/AppStateProvider/AppStateProvider';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <AppStateProvider>
        <App />
      </AppStateProvider>
    </ConfigProvider>
  </StrictMode>
);
