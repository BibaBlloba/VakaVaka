import React, { useState } from 'react'

const VacanciesList = () => {

  const [vacancies, setVacancies] = useState()

  const getVacancies = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }
    const response = await fetch('http://localhost:8000/vacancies?page=1')
    console.log(response.json())
  }

  const Vacancy = () => {
    return (
      <div>
        <button onClick={getVacancies}>asd</button>
      </div>
    )
  }


  return (
    <div>
      <Vacancy />
    </div>
  )
}

export default VacanciesList
