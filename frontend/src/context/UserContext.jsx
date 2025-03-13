import React, { Children, createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("UserToken"))
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchUser = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }
      }
      const response = await fetch(`${API_URL}/auth/me`, requestOptions)
      const data = await response.json()
      if (!response.ok) {
        setToken(null);
      }
      localStorage.setItem("UserToken", token)
      console.log(data)
    }
    fetchUser();

  }, [])

  return (
    <UserContext.Provider value={[token, setToken]}>
      {props.children}
    </UserContext.Provider>
  )
}
