import React, { useEffect, useState } from 'react'
import { Input, Button } from 'antd'
import { IoIosSearch } from 'react-icons/io';
import VacanciesList from '../components/VacanciesList';
import Filters from '../components/Filters';
import axios from 'axios';
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io'

const SearchPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const API_URL = import.meta.env.VITE_API_URL;
  const [vacancies, setVacancies] = useState([]);
  const [filters, setFilters] = useState({});

  const getVacancies = async (page = 1) => {
    const queryParams = new URLSearchParams(filters).toString();
    const apiUrl = `${API_URL}/vacancies?page=${page}&per_page=10${queryParams ? `&${queryParams}` : ''}`;

    axios.get(apiUrl)
      .then(response => {
        setVacancies(response.data)
      })
      .catch(error => {
        console.log("Ошибка при получении данных", error)
      })
  }

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  useEffect(() => {
    getVacancies(currentPage);
  }, [filters])

  return (
    <div className='text-black flex flex-col items-stretch mt-20 gap-5'>
      <div className='flex justify-start items-center gap-10 mx-[10%]'>
        <Input size='large' placeholder='Поиск по вакансиям' prefix={<IoIosSearch />} />
        <Button color='primary' variant='solid' shape='round'>
          <p className='font-[400] mx-5'>Поиск</p>
        </Button>
      </div>
      <div className='flex gap-20 mb-16 mx-[20%]'>
        <Filters setFilters={setFilters} />
        <div className='flex flex-col items-center gap-4 min-h-screen'>
          <p>Вакансии</p>
          <div className='flex flex-row gap-4 items-center'>
            <Button onClick={handlePrevPage} disabled={currentPage === 1}>
              <IoMdArrowRoundBack size={20} />
            </Button>
            <p>{currentPage}</p>
            <Button onClick={handleNextPage} disabled={vacancies.length === 0 | vacancies.length !== 10}>
              <IoMdArrowRoundForward size={20} />
            </Button>
          </div>
          <VacanciesList VacanciesList={vacancies} />
        </div>
      </div>
    </div>
  )
}

export default SearchPage
