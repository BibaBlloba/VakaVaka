import React, { useEffect, useState } from 'react'
import { MdCurrencyRuble } from 'react-icons/md'
import PriceNumber from './PriceNumber'
import { Button } from 'antd'

const VacanciesList = () => {

  const [vacancies, setVacancies] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getVacancies = async () => {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }
      try {
        const response = await fetch('http://localhost:8000/vacancies?page=1', requestOptions)
        const resp_json = await response.json()
        setVacancies(resp_json)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    };

    getVacancies();
  }, [])


  const Vacancy = ({ title, short_description, full_description, price, location, id, created_at, tags }) => {
    return (
      <a href='/' className='flex flex-row justify-between hover:shadow-xl duration-150 bg-white border-1 border-[#D1D5DB] rounded-2xl gap-2 p-2 min-w-[500px] min-h-[150px]'>
        <div className='flex flex-col gap-2'>
          <p className='font-[600] text-xl '>{title}</p>
          <p>{short_description}</p>
          <div className='flex items-center'>
            <p>Зпшка: {<PriceNumber number={price} />}</p>
            <MdCurrencyRuble />
          </div>
          <div className='flex gap-5'>
            <Button type='primary'>Откликнуться</Button>
            <Button variant='outlined' color='primary'>Контакты</Button>
          </div>
        </div>
        <div className=''>

        </div>
      </a>
    )
  }

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <p>Вакансии</p>
      <div className='flex flex-col gap-2'>
        {vacancies &&
          vacancies.map((vacancy, id) => (
            <div key={id}>
              <Vacancy title={vacancy.title} short_description={vacancy.short_description} price={vacancy.price} />
            </div>
          ))}
      </div>
    </div>
  )
}

export default VacanciesList
