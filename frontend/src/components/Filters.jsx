import { Button, Divider, Form, Input, InputNumber } from 'antd'
import React from 'react'


const Filters = ({ setFilters }) => {

  const onFinish = (values) => {
    setFilters({
      "min_price": values['min-price'] === "" | values['min-price'] === undefined ? 0 : values['min-price'],
    });
  };

  const onReset = () => {
    setFilters({
      "min_price": 0,
    });
  }


  return (
    <div className='min-w-[300px] flex flex-col p-8 border-1 border-[#D1D5DB] rounded-2xl'>
      <Form
        layout='vertical'
        onFinish={onFinish}
      >
        <Form.Item>
          <p className='mb-4 text-base'>Зарплатные ожидания</p>
          <Form.Item name="min-price">
            <div className='flex flex-row items-center gap-4'>
              <p>От</p>
              <InputNumber></InputNumber>
            </div>
          </Form.Item>
          <Divider style={{ borderColor: '#D1D5DB' }} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Обновить</Button>
          <Button htmlType="reset" onClick={onReset} style={{ marginLeft: 8 }}>
            Сбросить
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Filters
