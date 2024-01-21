// import React from 'react'

import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyOtp = ({email}) => {
    let {login}= useAuth();
    let [formData, setFormData] = useState({
        otp:"",
        email:email
    })
    let navigate = useNavigate();
    const handleOnchange = ({target:{name, value}})=>{
        setFormData({...formData, [name]:value})
    }

    const submit = async(e)=>{
        e.preventDefault();
        try{
            let {data} = await axios.post("http://localhost:5000/api/user/verifyuser", formData);
            console.log(data)
            alert(data.message)
            localStorage.setItem("token", data.token)
            setTimeout(() => {
                localStorage.removeItem("token")
            }, 600000);
            login(data.token)
            navigate("/profile")
        }
        catch(err){
            console.log(err)
        }
    }
  return (
    <div>
        <form onSubmit={submit}>
            <input type="text" name='otp' value={formData.otp} onChange={handleOnchange} placeholder='Enter Otp Here'/>
            <button>Verify OTP</button>
        </form>
    </div>
  )
}

export default VerifyOtp