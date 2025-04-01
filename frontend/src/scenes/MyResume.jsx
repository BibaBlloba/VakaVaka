import { Select } from "antd";
import React, { useEffect, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import axios from 'axios'

const MyResume = () => {
  const [tags, setTags] = useState(null)
  const [loadingTags, setLoadingTags] = useState(true)
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getTags = async () => {
      axios.get(`${API_URL}/tags`)
        .then(response => { setTags(response.data) })
        .finally(() => { setLoadingTags(false) })
    }
    getTags()
  }, [])

  return (
    <div className="min-h-screen flex flex-col ml-60 mt-20 gap-14">
      <div className="">
        <p className="text-3xl">Мои резюме</p>
      </div>
      <div className="flex flex-row gap-5">
        <div className="border-1 border-solid border-[##CCD5DF] rounded-2xl flex flex-row items-center gap-4 p-5 min-w-[300px] justify-between">
          <div className="flex flex-row gap-5 items-center">
            <div className="">Avatar</div>
            <div className="">
              <div className="">Профиль</div>
              <div className="">ФИО</div>
            </div>
          </div>
          <div className=""><FaArrowRight /></div>
        </div>
        <div className="border-1 border-solid border-[##CCD5DF] rounded-2xl p-5 flex flex-row items-center gap-5 min-w-[300px] justify-between">
          <div className="flex flex-col">
            <div className="">Ваш статус</div>
            <div className="">Укажите ваш статус</div>
          </div>
          <div className=""><FaArrowRight /></div>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="border-1 border-solid rounded-2xl border-[##CCD5DF] p-5 flex flex-col gap-5 min-w-[620px]">
          <p className="text-xl">Навыки</p>
          <p className="text-xl">// Список навыков</p>
          <Select mode="multiple" placeholder="Укажите ключевые навыки">
            {loadingTags ? (
              <Option>Loading...</Option>
            ) : (
              tags.map((tag, id) => (
                <Option key={id} value={tag.id}>{tag.title}</Option>
              ))
            )}
          </Select>
        </div>
      </div>
    </div>
  )
}

export default MyResume
