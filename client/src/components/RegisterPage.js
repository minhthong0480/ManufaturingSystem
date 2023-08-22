import React, { useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import '../Style/RegisterPage.css';
const RegisterPage = () => {
  const [loading, setLoading] = useState(false);

  const handleRegister = (values) => {
    setLoading(true);
    // Simulating register request
    setTimeout(() => {
      setLoading(false);
      console.log('Registered with:', values);
    }, 2000);
  };

  return (
    <div className="Register">
      <header className="Register-header">
      <div className='Register-form-container'>
        <h2>Register</h2>
        <div className='Register-form'>
        <Form
          autoComplete="off"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
          onFinish={handleRegister}
          onFinishFailed={(error) => {
            console.log({ error });
          }}
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: "Please enter your username",
              },
              { whitespace: true },
              { min: 2 },
            ]}
            hasFeedback
          >
            <Input placeholder="Type your username" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please enter your password"
              },
              { min: 6 },
              {
                validator: (_, value) =>
                  value && value.includes("A")
                    ? Promise.resolve()
                    : Promise.reject("Password does not match criteria"),
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Type your password" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please enter your confirmation password"
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "The password and confirmation password are not matched, please try again"
                  );
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Confirm your password" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please enter your email",
              },
              { type: "email", message: "Please enter a valid email" },
            ]}
            hasFeedback
          >
            <Input placeholder="Type your email" />
          </Form.Item>

          <Form.Item 
            name="phone" 
            label="Phone" 
            rules={[
              { 
                required: true, 
                pattern: '^[0-9]{10}$',
                message: 'Phone number does not match criteria' }
            ]}
            hasFeedback
          >
            <Input placeholder="Type your phone number" />
          </Form.Item>

          <Form.Item 
            name="role" 
            label="User Role" 
            rules={[
              {
                required: true,
                message: "Please choose your role",
              }
            ]}
          >
            <Select placeholder="Select your role">
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="user">User</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button backg block type="primary" htmlType="submit" loading={loading}>
              Create Account
            </Button>
          </Form.Item>
        </Form>
        </div>
        </div>
      </header>
    </div>
  );
};

export default RegisterPage;
