// import React from 'react'

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {

  let navigate = useNavigate();

  const [loginData, setLoginData] = useState({
      email:"",
      password:""
  })
  const handleChangeLogin = async(e)=>{
      const {name, value} = e.target;
      setLoginData({...loginData, [name]:value})
  }
  const handleReset = async(e)=>{
    e.preventDefault();
    try{
        let response = await axios.post("http://localhost:5000/api/user/resetpassword", loginData)
        // console.log(response);
        alert(response.data.message)
        navigate("/")
    }
    catch(err){
        alert(err.response.data.message)
    }
}

    return (
        <div>
          <form onSubmit={handleReset}>
            <input type="email" name='email' value={loginData.email}
            placeholder='email id' required onChange={handleChangeLogin}/>
            <input type="password" name='password' value={loginData.password} 
            placeholder='New password' required onChange={handleChangeLogin}/>

          <input className='btn' type="submit" value="Reset" />

          </form>
        </div>
  )
}

export default ResetPassword