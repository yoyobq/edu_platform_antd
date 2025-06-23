// src/pages/auth/Login/components/loginForm/loginForm.tsx

import { ArrowRightOutlined, LockOutlined, MailOutlined, QrcodeOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Space, Typography } from 'antd';
import React from 'react';


const { Link } = Typography;

const LoginForm: React.FC = () => {
  return (
    <div className="login-form-root">
      <Form
        name="login"
        layout="vertical"
        autoComplete="off"
        style={{ width: '100%' }}
      >
        <Form.Item>
          <div style={{ fontWeight: 600, fontSize: 18, color: 'var(--antd-color-primary)' }}>
            邮箱密码登录
          </div>
        </Form.Item>

        <Form.Item
          name="email"
          rules={[{ required: true, message: '请输入账号或邮箱' }]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="输入账号或邮箱均可登录"
            size="large"
            autoComplete="username"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="请输入密码"
            size="large"
            autoComplete="current-password"
          />
        </Form.Item>

        {/* 滑动验证码占位符，可替换为第三方组件 */}
        <Form.Item>
          <Button
            block
            icon={<ArrowRightOutlined />}
            size="large"
            style={{
              background: 'var(--antd-color-primary)',
              color: '#fff',
              fontWeight: 600,
              marginBottom: 10,
            }}
          >
            滑动验证登录
          </Button>
        </Form.Item>

        <Form.Item>
          <Space style={{ width: '100%', justifyContent: 'space-between' }}>
            <Button
              type="primary"
              block
              size="large"
              icon={<UserAddOutlined />}
              style={{
                background: 'var(--antd-color-primary)',
                borderColor: 'var(--antd-color-primary)',
                fontWeight: 600,
                width: '70%',
              }}
            >
              注册
            </Button>
            <Link style={{ fontSize: 14 }} href="/auth/forgot">
              忘记密码？
            </Link>
          </Space>
        </Form.Item>

        <Divider plain style={{ color: '#999', margin: '18px 0 12px 0' }}>
          其他方式登录
        </Divider>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
          <div style={{ textAlign: 'center' }}>
            <QrcodeOutlined style={{ fontSize: 32, color: 'var(--antd-color-primary)' }} />
            <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>微信扫码登录</div>
            {/* 可替换为 antd QRCode 组件，实际部署时用 */}
            {/* <QRCode value="https://your-url.com/wechat-login" /> */}
          </div>
          {/* 其他第三方可陆续加 */}
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
