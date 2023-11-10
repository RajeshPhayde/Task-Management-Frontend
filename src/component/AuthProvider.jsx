// import React from 'react'

import { createContext, useContext, useState } from "react"

let AuthContext = createContext();
const AuthProvider = ({children}) => {

    let [user, setUser] = useState("");
    let login = (data)=>{
        setUser(data);
    }
    let logout = ()=>{
        setUser(null);
    }
  return (
    <AuthContext.Provider value={{user, login, logout}}>
        {children}
    </AuthContext.Provider>
  )
}
export default AuthProvider

let useAuth = ()=>{
    return useContext(AuthContext)
}
export {useAuth}