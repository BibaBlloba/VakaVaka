import React from 'react'
import { Tabs } from 'antd';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm'

const items = [
  {
    key: '1',
    label: 'Login',
    children: <LoginForm />,
  },
  {
    key: '2',
    label: 'Register',
    children: <RegisterForm />,
  },
];

const Authorization = () => {
  return (
    <div className='text-black'>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  )
}

export default Authorization
