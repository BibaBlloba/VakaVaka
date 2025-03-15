import { Form, Input, Select, Button } from "antd";
import React, { useEffect, useState } from "react";
const { TextArea } = Input;
import axios from 'axios';

const CreateVacancyPage = () => {

  const [tags, setTags] = useState(null)
  const [loadingTags, setLoadingTags] = useState(true)
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
      "price": 0,
      "location": "asd",
      "tags": [],
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
            label="Ключевые навыки"
            rules={[
              {
                type: 'array',
              },
            ]}
            name="tags"
          >
            <Select mode="multiple" placeholder="Please select favourite colors">
              {loadingTags ? (
                <Option>Loading...</Option>
              ) : (
                tags.map((tag, id) => (
                  <Option key={id} value={tag.title}>{tag.title}</Option>
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
    </div>
  );
};

export default CreateVacancyPage;
