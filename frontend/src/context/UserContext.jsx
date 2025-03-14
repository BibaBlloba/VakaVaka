import { jwtDecode } from "jwt-decode";
import React, { Children, createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("UserToken"));
  const [refresh_token, setRefreshToken] = useState(localStorage.getItem("RefreshToken"));
  const [roles, setRoles] = useState(null)
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const refreshUser = async () => {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: refresh_token }),
      };
      const response = await fetch(`${API_URL}/auth/refresh`, requestOptions);
      const data = await response.json();
      localStorage.setItem("UserToken", data.access_token);
    }
    const fetchUser = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const response = await fetch(`${API_URL}/auth/me`, requestOptions);
      const data = await response.json();
      if (!response.ok) {
        setToken(null)
        refreshUser()
      }
      localStorage.setItem("UserToken", token);
    };
    try {
      setRoles(jwtDecode(token).roles)
    } catch {
      setRoles(null)
    }
    fetchUser()
    console.log(roles)
  }, []);

  return (
    <UserContext.Provider value={[token, setToken, roles]}>
      {props.children}
    </UserContext.Provider>
  );
};
