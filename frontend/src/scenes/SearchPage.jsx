import React from 'react'
import { Input, Button } from 'antd'
import { IoIosSearch } from 'react-icons/io';
import VacanciesList from '../components/VacanciesList';

const SearchPage = () => {
  return (
    <div className='text-black flex flex-col items-stretch mt-20 gap-5'>
      <div className='flex justify-start items-center gap-10 mx-[10%]'>
        <Input size='large' placeholder='Поиск по вакансиям' prefix={<IoIosSearch />} />
        <Button color='primary' variant='solid' shape='round'>
          <p className='font-[400] mx-5'>Поиск</p>
        </Button>
      </div>
      <div className='flex justify-center gap-20 mb-16'>
        <div>Filters</div>
        <VacanciesList searchTitle={"asd"} />
      </div>
    </div>
  )
}

export default SearchPage
