// components/PageSkeleton.tsx
import { Spin } from 'antd';

export const PageSkeleton: React.FC = () => (
  <div style={{ padding: 100, textAlign: 'center' }}>
    <Spin size="large" />
  </div>
);
