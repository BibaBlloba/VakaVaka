import React, { useEffect, useState } from 'react'
import { MdCurrencyRuble } from 'react-icons/md'
import PriceNumber from './PriceNumber'
import { Button } from 'antd'
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io'

const VacanciesList = ({ searchTitle }) => {

  const [vacancies, setVacancies] = useState()
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const API_URL = import.meta.env.VITE_API_URL;

  const getVacancies = async (page = 1) => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }
    try {
      const response = await fetch(`${API_URL}/vacancies?page=${page}&per_page=10`, requestOptions)
      const resp_json = await response.json()
      setVacancies(resp_json)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    console.log(vacancies)
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    console.log(vacancies)
  };

  useEffect(() => {
    getVacancies(currentPage);
  }, [currentPage])


  const Vacancy = ({ title, short_description, full_description, price, min_price, max_price, location, id, created_at, tags, searchTitle }) => {
    return (
      <a href={`/vacancy/${id}`} className='flex flex-row justify-between hover:shadow-xl duration-150 bg-white border-1 border-[#D1D5DB] rounded-2xl gap-2 p-2 min-w-[500px] max-w-[700px] min-h-[150px]' >
        <div className='flex flex-col gap-2'>
          <p className='font-[600] max-w-[300px] text-xl '>{title}</p>
          <p>{short_description}</p>
          {price ? (
            <div className='flex items-center'>
              <p>Зпшка: {<PriceNumber number={min_price} />} - {<PriceNumber number={max_price} />}</p>
              <MdCurrencyRuble />
              <p></p>
            </div>
          ) : (
            <div>
              Зп НЕ БУДЕДТ!!!!!!!!
            </div>
          )}
          <div className='flex gap-5'>
            <Button type='primary' shape='round'>Откликнуться</Button>
            <Button variant='outlined' color='primary' shape='round'>Контакты</Button>
          </div>
        </div>
        <div className=''>

        </div>
      </a >
    )
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className='flex flex-col items-center gap-4 min-h-screen'>
      <p>Вакансии</p>
      <div className='flex flex-row gap-4 items-center'>
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
          <IoMdArrowRoundBack size={20} />
        </Button>
        <p>{currentPage}</p>
        <Button onClick={handleNextPage} disabled={vacancies.length === 0 | vacancies.length <= 10}>
          <IoMdArrowRoundForward size={20} />
        </Button>
      </div>
      <div className='flex flex-col gap-2'>
        {vacancies.length != 0 ? (
          vacancies.map((vacancy, id) => (
            <div key={id}>
              <Vacancy title={vacancy.title} short_description={vacancy.short_description} price={vacancy.price} id={vacancy.id} min_price={vacancy.min_price} max_price={vacancy.max_price} />
            </div>
          ))) : <div>Больше вакансий нет ¯\_(ツ)_/¯</div>
        }
      </div>
    </div>
  )
}

export default VacanciesList
