import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {

  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]); 

  const isLogin = !!token

  return (
    <UserContext.Provider value={{ isLogin, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
}