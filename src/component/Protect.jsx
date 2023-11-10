// import React from 'react'

import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider"

const Protect = ({children}) => {
  
    let {user} = useAuth();

    if(!user){
        return <Navigate to="/"/>
    }

    return (
    <div>
        {children}
    </div>
  )
}

export default Protect