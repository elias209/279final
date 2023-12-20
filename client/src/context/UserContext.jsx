import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const initialUserName = localStorage.getItem("userName") || "";
  const initialUserPassword = localStorage.getItem("userPassword") || "";

  const [userName, setUserName] = useState(initialUserName);
  const [userPassword, setUserPassword] = useState(initialUserPassword);

  console.log("Initial userName:", initialUserName);
  console.log("Initial userPassword:", initialUserPassword);

  useEffect(() => {
    console.log("Updating local storage...");
    localStorage.setItem("userName", userName);
    localStorage.setItem("userPassword", userPassword);
    console.log("Local storage updated.");
  }, [userName, userPassword]);

  console.log("Current userName:", userName);
  console.log("Current userPassword:", userPassword);

  const updateUserPassword = (newPassword) => {
    console.log("Updating userPassword with:", newPassword);
    setUserPassword(newPassword);
  };

  const logout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userPassword");

    setUserName("");
    setUserPassword("");
  };

  return (
    <UserContext.Provider
      value={{
        userName,
        setUserName,
        userPassword,
        updateUserPassword,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
