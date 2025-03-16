import { Form, Input, Select, Button, Slider, Checkbox } from "antd";
import React, { useEffect, useState } from "react";
const { TextArea } = Input;
import axios from 'axios';

const CreateVacancyPage = () => {

  const [tags, setTags] = useState(null)
  const [loadingTags, setLoadingTags] = useState(true)
  const [price, setPrice] = useState(true)
  const [formData, setFormData] = useState({
    title: "",
    short_description: "",
    full_description: "",
    price: 0,
    location: "",
    tags: []
  });
  const API_URL = import.meta.env.VITE_API_URL;

  // TODO: Доделать отправку запроса на создание вакансии
  const onFinish = async (values) => {
    console.log(values)

    const data = {
      "title": values.title,
      "short_description": values.short_description,
      "full_description": values.full_description,
      "price": values.isPrice,
      "min_price": values.isPrice ? values.min_price : 0,
      "max_price": values.isPrice ? values.max_price : 0,
      "location": "asd",
      "tags": values.tags,
    }

    try {
      const response = await axios.post(`${API_URL}/vacancies`, data, { withCredentials: true })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  // }]);

  useEffect(() => {
    const getTags = async () => {
      axios.get(`${API_URL}/tags`)
        .then(response => { setTags(response.data) })
        .finally(() => { setLoadingTags(false) })
    }

    getTags()
  }, [])


  return (
    <div className="text-black flex-col mx-[30%] mt-20">
      <div className="flex flex-col items-start">
        <Form layout="vertical" className="w-[80%]" onFinish={onFinish}>
          <Form.Item label="Название вакансии" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="Краткое описание" name="short_description">
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Полное описание" name="full_description">
            <TextArea rows={10} />
          </Form.Item>
          <Form.Item
            name="isPrice"
            valuePropName="checked"
            label={null}
          >
            <Checkbox
              onChange={() => { setPrice(!price) }}
            >Указать зарплатную вилку</Checkbox>
          </Form.Item>
          <Form.Item
            label="Зарплатная вилка"
          >
            <Form.Item
              style={{
                display: 'inline-block',
                width: 'calc(50% - 8px)',
              }}
              name="min_price"
            >
              <div className="flex flex-row items-center gap-3">
                <p>От</p>
                <Input disabled={price} />
              </div>
            </Form.Item>

            <Form.Item
              style={{
                display: 'inline-block',
                width: 'calc(50% - 8px)',
                margin: '0 8px',
              }}
              name="max_price"
            >
              <div className="flex flex-row items-center gap-3">
                <p>До</p>
                <Input disabled={price} />
              </div>
            </Form.Item>
          </Form.Item>
          <Form.Item
            label="Ключевые навыки"
            rules={[
              {
                type: 'array',
              },
            ]}
            name="tags"
          >
            <Select mode="multiple" placeholder="Укажите ключевые навыки">
              {loadingTags ? (
                <Option>Loading...</Option>
              ) : (
                tags.map((tag, id) => (
                  <Option key={id} value={tag.id}>{tag.title}</Option>
                ))
              )}
            </Select>
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Опубликовать вакансию
            </Button>
          </Form.Item>
          <Form.Item label={null}>
            <Button type="default" htmlType="submit">
              Сохранить черновик
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div >
  );
};

export default CreateVacancyPage;
