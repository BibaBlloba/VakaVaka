import React, { useContext } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { UserContext } from "../context/UserContext";
import { message, Dropdown } from 'antd';
import { IoLogOut } from "react-icons/io5";
import { ImProfile } from "react-icons/im";

const Navbar = () => {
  const [token, setToken, roles] = useContext(UserContext);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  const handleResume = () => {
    if (token) {
      window.location.href = "/create-resume"
    } else {
      window.location.href = "/test-auth"
    }
  }

  const handleVacancy = () => {
    console.log(`access_token: ${getCookie("access_token")}`)
    if (token && roles.includes("organization") && (getCookie("access_token") === null)) {
      window.location.href = "/create-vacancy"
    } else if (token && !roles.includes("organization")) {
      window.location.href = "/organization-request"
    } else {
      window.location.href = "/test-auth"
    }
  }

  const itemsForUser = [
    {
      label: 'Profile',
      key: 'profile',
      icon: <ImProfile size={20} />,
    },
    {
      label: 'LogOut',
      key: 'logout',
      danger: true,
      icon: <IoLogOut size={20} />,
    },
  ]

  const itemsForGuests = [
    {
      label: 'LogIn',
      key: 'login',
      icon: <IoLogOut size={20} />,
    },
  ]


  const handleMenuClick = (e) => {
    console.log(e)
    if (e.key == 'logout') {
      localStorage.setItem("UserToken", null);
      localStorage.setItem("RefreshToken", null);
      window.location.href = "/";
    } else if (e.key == 'login') {
      window.location.href = "/test-auth";
    }
  };

  const menuProps = {
    items: token ? itemsForUser : itemsForGuests,
    onClick: handleMenuClick,
  };

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
            <a href="/">Поиск</a>
          </button>
          <button onClick={handleResume} className="rounded-xl px-3 py-2 bg-gray-700 font-bold hover:cursor-pointer hover:bg-[#404E63] active:scale-90 duration-100">
            <p>Создать резюме</p>
          </button>
          <button
            onClick={handleVacancy}
            className="rounded-xl px-3 py-2 bg-gray-700 font-bold hover:cursor-pointer hover:bg-[#404E63] active:scale-90 duration-100"
          >
            <p>Создать вакансию</p>
          </button>
        </div>
        <Dropdown trigger={['click']} menu={menuProps}>
          <a href="">
            <FaRegUserCircle className="hover:cursor-pointer" size={27} />
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export default Navbar;
