import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PriceNumber from '../components/PriceNumber'
import { MdCurrencyRuble } from 'react-icons/md'
import { Button } from 'antd'
import DateFormatter from '../components/DateFormatter'

function Vacancy() {

  const [data, setData] = useState(null)
  const { id } = useParams()
  const [lines, setLines] = useState(null)
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
      const response = await fetch(`${API_URL}/vacancies/${id}?page=1`, requestOptions)
      const result = await response.json()

      result.map((res) => {
        const lines = res.full_description.split('\n')
        setLines(lines)
        setData(res)
      })
    }

    fetchData()
  }, [id])


  if (!data) {
    return <div>Загрузка...</div>
  }

  return (
    <div className='text-black flex justify-between gap-10 mt-10 mx-[30%]'>
      <div className='flex flex-col gap-10'>
        <div className='border-1 border-[#D1D5DB] rounded-2xl w-[600px] min-h-[100px] p-5 flex flex-col gap-3'>
          <p className='text-4xl font-[700]'>{data.title}</p>
          <div className='flex items-center'>
            {data.price ?
              (
                <p className='text-xl'>Зпшка: {<PriceNumber number={data.min_price} />} - {<PriceNumber number={data.max_price} />}</p>
              ) : (
                <div>ЗП НЕ БУТТЕТ!</div>
              )
            }
            <MdCurrencyRuble size={20} />
          </div>
          <DateFormatter isoDate={data.created_at} />
          <div className='flex gap-5'>
            <Button type='primary' shape='round'>Откликнуться</Button>
            <Button variant='outlined' color='primary' shape='round'>Контакты</Button>
          </div>
        </div>
        <div className='max-w-[600px]'>
          {lines.map((line, index) => {
            return (
              <>
                <p key={index}>{line}<br /></p>
              </>
            )
          })}
        </div>
        <div className=''>
          <p className='text-3xl font-[600px] mb-5'>Ключевые навыки</p>
          <div className='flex gap-4 max-w-[600px]'>
            {data.tags.map((tag, id) => {
              return (
                <div key={id} className='bg-[#D1D5DB] rounded-3xl py-1 px-2'>
                  <p>
                    {tag.title}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div>info</div>
    </div>
  )
}

export default Vacancy
