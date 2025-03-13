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

const RegisterForm = () => {
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
      const response = await axios.post(`${API_URL}/auth/register`, values);
      messageApi.success({
        content: "Data fetched successfully!",
        key,
        duration: 2,
      });
    } catch {
      messageApi.error({ content: "Failed to fetch data", key, duration: 2 });
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        defaultValue="7"
        style={{
          width: 70,
        }}
      >
        <Option value="7">+7</Option>
        <Option value="8">+8</Option>
      </Select>
    </Form.Item>
  );

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
        <Form.Item
          label="Confirm Password"
          name="password2"
          dependencies={["password"]}
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!"),
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          label="First name"
          name="first_name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last name"
          name="last_name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        {/* <Form.Item */}
        {/*   label="Date" */}
        {/*   name="date" */}
        {/*   rules={[ */}
        {/*     { */}
        {/*       required: true, */}
        {/*     }, */}
        {/*   ]} */}
        {/*   getValueProps={(value) => ({ */}
        {/*     value: value && dayjs(Number(value)), */}
        {/*   })} */}
        {/*   normalize={(value) => value && `${dayjs(value).valueOf()}`} */}
        {/* > */}
        {/*   <DatePicker /> */}
        {/* </Form.Item> */}
        <Form.Item
          name="age"
          label="Age"
          rules={[
            {
              type: "number",
              min: 1,
              max: 99,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="phone_number"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={null}>
          <Button block type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;
