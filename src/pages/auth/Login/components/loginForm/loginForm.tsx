// src/pages/auth/Login/components/loginForm/loginForm.tsx

import { LockOutlined, MailOutlined, UserAddOutlined, WechatOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, Space, Tabs, Typography, message } from 'antd';
import type { VerifyParam } from 'rc-slider-captcha';
import SliderCaptcha from 'rc-slider-captcha';
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

  const handleSliderVerify = async (data: VerifyParam) => {
    console.log('滑块验证数据:', data);
    try {
      // 在slider模式下，可以通过移动轨迹、持续时间等判断是否为人工操作
      // 这里是简单的验证逻辑示例
      const { duration, trail, x } = data;
      
      // 基本的人机验证逻辑：
      // 1. 操作时间不能太短（防止机器人）
      // 2. 移动轨迹应该有一定的波动（人工操作特征）
      const isValidDuration = duration > 300; // 至少300ms
      const isValidTrail = trail.length > 5; // 轨迹点数量
      const isValidPosition = x > 250; // 滑动距离足够（假设总宽度320px）
      
      if (isValidDuration && isValidTrail && isValidPosition) {
        message.success('验证成功！');
        const values = form.getFieldsValue();
        handleSubmit(values);
        return Promise.resolve();
      } else {
        return Promise.reject('验证失败，请重试');
      }
    } catch (error) {
      return Promise.reject('验证失败，请重试');
    }
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

            {/* 纯滑块验证码 - 使用 slider 模式 */}
            <div className={styles.sliderCaptcha}>
              <SliderCaptcha
                mode="slider"
                bgSize={{ width: 304, height: 48 }}
                onVerify={handleSliderVerify}
                tipText={{
                  default: '请滑动验证登录',
                  moving: '请继续拖动滑块',
                  verifying: '验证中...',
                  success: '验证成功',
                  error: '验证失败，请重试'
                }}
                autoRefreshOnError={true}
                errorHoldDuration={1000}
                limitErrorCount={3}
                style={{ width: '100%' }}
                styles={{
                  control: {
                    height: '48px',
                    borderRadius: '14px'
                  }
                }}
              />
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
