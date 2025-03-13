import {
  Form,
  Input,
  Button,
  DatePicker,
  Select,
  message,
  InputNumber,
} from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import dayjs from "dayjs";
import axios from "axios";

const LoginForm = () => {
  const { Option } = Select;
  const API_URL = import.meta.env.VITE_API_URL;

  const onFinishFailed = async (values) => {
    console.log("Failed:", values);
  };

  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = async (values) => {
    const key = "fetchData";
    messageApi.loading({ content: "Loading...", key });

    try {
      const response = await axios.post(`${API_URL}/auth/login`, values);
      messageApi.success({
        content: "Data fetched successfully!",
        key,
        duration: 2,
      });
    } catch {
      messageApi.error({ content: "Failed to fetch data", key, duration: 2 });
    }
  };

  return (
    <div className="text-black">
      {contextHolder}
      <Form
        layout="vertical"
        style={{ maxWidth: 300 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Login"
          name="login"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item label={null}>
          <Button block type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
