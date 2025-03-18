import React from 'react'
import { LiaTelegramPlane } from "react-icons/lia";
import { FaSteamSymbol } from "react-icons/fa6";
import { SiFastapi } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { SiPostgresql } from "react-icons/si";
import { TbBrandDocker } from "react-icons/tb";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='bg-black text-gray-400 flex justify-around gap-16 p-10 px-60'>
      <div className='flex flex-col gap-3'>
        <a href='/' className='text-xl text-white'>VakaVaka</a>
        <a href='https://hh.ru'>Референс</a>
        <a href=''>О компании</a>
        <a href='https://youtu.be/ug5SmocSBmo?si=dq_1EUSxCobY0RCJ'>Рофл</a>
      </div>
      <div className='flex flex-col gap-3'>
        <a className='text-xl text-white'>Новости и статьи</a>
        <a href=''>Рынок труда</a>
        <a href=''>Жизнь компании</a>
        <a href=''>ИТ-проекты</a>
      </div>
      <div className='flex flex-col gap-3'>
        <a className='text-xl text-white'>Соц-сети</a>
        <div className='flex flex-row gap-3'>
          <a href='' className='size-[40px] border-gray-400 border-1 rounded-xl flex justify-center items-center'>
            <LiaTelegramPlane size={24} />
          </a>
          <a href='' className='size-[40px] border-gray-400 border-1 rounded-xl flex justify-center items-center'>
            <FaSteamSymbol size={24} />
          </a>
          <a href='https://github.com/BibaBlloba/VakaVaka/tree/main' className='size-[40px] border-gray-400 border-1 rounded-xl flex justify-center items-center'>
            <FaGithub size={24} />
          </a>
        </div>
      </div>
      <div className='flex flex-col gap-3'>
        <a className='text-xl text-white'>Стек технологий</a>
        <div className='flex flex-row gap-3'>
          <a href='' className='size-[40px] border-gray-400 border-1 rounded-xl flex justify-center items-center'>
            <SiFastapi size={24} />
          </a>
          <a href='' className='size-[40px] border-gray-400 border-1 rounded-xl flex justify-center items-center'>
            <FaReact size={24} />
          </a>
          <a href='' className='size-[40px] border-gray-400 border-1 rounded-xl flex justify-center items-center'>
            <SiPostgresql size={24} />
          </a>
          <a href='' className='size-[40px] border-gray-400 border-1 rounded-xl flex justify-center items-center'>
            <TbBrandDocker size={30} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer
