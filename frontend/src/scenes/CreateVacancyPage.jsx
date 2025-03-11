import { Form, Input } from "antd";
import React from "react";

const CreateVacancyPage = () => {
  return (
    <div className="text-black flex-col mx-[30%] mt-20">
      <div className="flex flex-col items-start">
        <Form layout="vertical">
          <Form.Item label="Название вакансии">
            <Input />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateVacancyPage;
