import { Divider, Form, Input, InputNumber } from 'antd'
import React from 'react'

const onFinish = async () => {

}

const Filters = () => {
  return (
    <div className='min-w-[300px] flex flex-col p-8 border-1 border-[#D1D5DB] rounded-2xl'>
      <Form
        layout='vertical'
        onFinish={onFinish}
      >
        <Form.Item>
          <p className='mb-4 text-base'>Зарплатная вилка</p>
          <Form.Item name="min-price">
            <div className='flex flex-row items-center gap-4'>
              <p>От</p>
              <InputNumber></InputNumber>
            </div>
          </Form.Item>
          <Form.Item name="max-price">
            <div className='flex flex-row items-center gap-4'>
              <p>До</p>
              <InputNumber></InputNumber>
            </div>
          </Form.Item>
          <Divider style={{ borderColor: '#D1D5DB' }} />
        </Form.Item>
      </Form>
    </div>
  )
}

export default Filters
