import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = (values) => {
    setLoading(true);
    // Simulating login request
    setTimeout(() => {
      setLoading(false);
      console.log('Logged in with:', values);
    }, 2000);
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <h2>Login Page</h2>
      <Form onFinish={handleLogin}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please enter your username' }]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
