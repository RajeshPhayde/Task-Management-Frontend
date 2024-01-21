// import React from 'react'

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VerifyOtp from "./VerifyOtp";

const LoginOtp = () => {
    let [formData, setFormData] = useState({email:""})
    let [otpSent, setOtpSent] = useState(false);

    let navigate = useNavigate();
    const handleOnchange = ({target:{name, value}})=>{
        setFormData({...formData, [name]:value})
    }

    const sendOtp = async(e)=>{
        e.preventDefault();
        try{
            let otp = await axios.post("http://localhost:5000/api/user/otplogin", formData);
            setOtpSent(true);
        }
        catch(err){
            console.log(err)
        }
    }
  return (
    <div>
        { !otpSent && <form onSubmit={sendOtp}>
            <input type="email" name='email' value={formData.email} onChange={handleOnchange}
            placeholder='Email Id' required/>
            <button>Send OTP</button>
        </form>}

        { otpSent &&  <VerifyOtp email={formData.email}/>}
    </div>
  )
}

export default LoginOtp