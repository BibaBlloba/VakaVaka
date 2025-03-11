import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center bg-black h-15 p-4 px-10 font-[500]">
      <div className="flex items-center gap-10">
        <a href="/" className="text-2xl">
          VakaVaka
        </a>
        <div className="flex gap-10">
          <p>Мои резюме</p>
          <p>Отклики</p>
          <p>Сервисы</p>
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <div className="flex items-center gap-10">
          <button className="flex gap-2">
            <IoIosSearch size={25} />
            <p>Поиск</p>
          </button>
          <button className="rounded-xl px-3 py-2 bg-gray-700 font-bold hover:cursor-pointer hover:bg-[#404E63] active:scale-90 duration-100">
            <p>Создать резюме</p>
          </button>
          <button
            onClick={() => {
              window.location.href = "/create-vacancy";
            }}
            className="rounded-xl px-3 py-2 bg-gray-700 font-bold hover:cursor-pointer hover:bg-[#404E63] active:scale-90 duration-100"
          >
            <p>Создать вакансию</p>
          </button>
        </div>
        <FaRegUserCircle size={27} />
      </div>
    </div>
  );
};

export default Navbar;
