import React, { useState, createContext } from "react";

const userDetail = {
  fname: "",
  middlename: "",
  lname: "",
  dob: "",
  state: "",
  email: "",
  username: "",
  phone: "",
  userid: "",
  role: null,
};

export const GlobalContext = createContext(null);

const ContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(userDetail);

  return (
    <GlobalContext.Provider
      value={{
        authUser,
        setAuthUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;
