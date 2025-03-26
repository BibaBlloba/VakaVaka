import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import { MdCurrencyRuble } from 'react-icons/md'
import PriceNumber from './PriceNumber'

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
    </a>
  )
}

const VacanciesList = ({ VacanciesList }) => {

  return (
    <div className='flex flex-col gap-2'>
      {VacanciesList.length != 0 ? (
        VacanciesList.map((vacancy, id) => (
          <div key={id}>
            <Vacancy title={vacancy.title} short_description={vacancy.short_description} price={vacancy.price} id={vacancy.id} min_price={vacancy.min_price} max_price={vacancy.max_price} />
          </div>
        ))) : <div>Больше вакансий нет ¯\_(ツ)_/¯</div>
      }
    </div>
  )
}

export default VacanciesList
