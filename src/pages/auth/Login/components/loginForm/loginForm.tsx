// src/pages/auth/Login/components/loginForm/loginForm.tsx

import { LockOutlined, MailOutlined, UserAddOutlined, WechatOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Space, Tabs, Typography, message } from 'antd';
import React, { useState } from 'react';
import styles from './loginForm.module.css';

const { Link } = Typography;

const LoginForm: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    try {
      console.log('登录信息:', values);
      message.success('登录成功！');
    } catch (error) {
      message.error('登录失败，请重试');
    }
  };

  const handleSliderVerify = () => {
    const values = form.getFieldsValue();
    handleSubmit(values);
  };

  return (
    <div className={styles.loginFormRoot}>
      <Form
        form={form}
        name="login"
        layout="vertical"
        autoComplete="off"
        style={{ width: '100%' }}
      >
        <Tabs
          activeKey={type}
          onChange={setType}
          items={[
            {
              key: 'account',
              label: (
                <span className={styles.loginTabLabel}>
                  邮箱密码登录
                </span>
              ),
            },
          ]}
          style={{ marginBottom: '24px' }}
        />

        {type === 'account' && (
          <>
            <Form.Item
              name="email"
              rules={[{ required: true, message: '请输入账号或邮箱' }]}
            >
              <Input
                prefix={<MailOutlined className={styles.formIcon} />}
                placeholder="输入账号或邮箱均可登录"
                size="large"
                autoComplete="username"
                style={{ height: '48px' }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password
                prefix={<LockOutlined className={styles.formIcon} />}
                placeholder="请输入密码"
                size="large"
                autoComplete="current-password"
                style={{ height: '48px' }}
              />
            </Form.Item>

            {/* 滑动验证码占位符 */}
            <div className={styles.sliderCaptcha}>
              <Button
                block
                size="large"
                onClick={handleSliderVerify}
                className={styles.sliderButton}
              >
                滑动验证登录
              </Button>
            </div>
          </>
        )}

        <Form.Item>
          <Space style={{ width: '100%', justifyContent: 'space-between' }}>
            <Button
              type="link"
              size="large"
              icon={<UserAddOutlined />}
              className={styles.registerButton}
            >
              注册
            </Button>
            <Link className={styles.forgotPasswordButton} href="/auth/forgot">
              忘记密码？
            </Link>
          </Space>
        </Form.Item>

        <Divider plain style={{ color: '#999', margin: '18px 0 12px 0' }}>
          其他方式登录
        </Divider>

        <div className={styles.otherLoginMethods}>
          <div className={styles.wechatLogin}>
            <div className={styles.wechatIcon}>
              <WechatOutlined />
            </div>
            <div className={styles.wechatText}>微信扫码登录</div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
