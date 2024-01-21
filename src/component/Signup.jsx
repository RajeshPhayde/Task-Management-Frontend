// import React from 'react'
import './css/Signup.css'

import { useState } from "react"
import { Link, useNavigate } from 'react-router-dom';
import  axios  from 'axios';
import { useAuth } from './AuthProvider';

const Signup = () => {

    let {login}= useAuth();
    let [Login, setLogin] = useState(false);
    let navigate = useNavigate();
    
    const [reset, setReset] = useState(false);
    //! If password dint match change it to true so that we can display forgot password
    
    const [formData, setFormData] = useState({
        name:"",
        email :"",
        password: "",
        role : "user"
    })
    const handleChange= (e)=>{
        const {name, value} = e.target;
        setFormData({...formData, [name]:value})
    }
    const handleSubmit =  async(e)=>{
        e.preventDefault();
        try{
            let response = await axios.post("http://localhost:5000/api/user/adduser", formData )
            // console.log(response)
            alert(response.message)
        }
        catch(err){
            // console.log(err)
            alert(err.response.data.message)
        }
    }

    const [LoginData, setLoginData] = useState({
        email:"",
        password:""
    })
    const handleChangeLogin = async(e)=>{
        const {name, value} = e.target;
        setLoginData({...LoginData, [name]:value})
    }
    const handleLogin = async(e)=>{
        e.preventDefault();
        try{
            let response = await axios.post("http://localhost:5000/api/user/userLogin", LoginData)
            // console.log(response);
            localStorage.setItem("token", response.data.token)
            alert(response.data.message)
            setTimeout(() => {
                localStorage.removeItem("token")
            }, 600000);
            login( response.data.token)
            navigate("/profile")
        }
        catch(err){
            setReset(true);
            alert(err.response.data.message)
        }
    }
  return (
    <div>
        {!Login && <form onSubmit={handleSubmit}>
            <h2>Signup</h2>
            <div>
                <p>Already a member? <Link onClick={()=>{setLogin(true)}}>Login</Link></p>
            </div>
            <input type="text" placeholder="username"
            name="name" value={formData.name}
            onChange={handleChange} required />

            <input type="email" placeholder='email id' 
            name="email" value={formData.email} 
            onChange={handleChange} required/>

            <input type="password" placeholder="password"
            name="password" value={formData.password} 
            onChange={handleChange} required/>

            <fieldset>
                <legend style={{textAlign:"center"}}>Role</legend>
                <label>
                    <input type="radio" name="role"
                    value='user' onChange={handleChange}
                    checked = {formData.role === "user"} />
                User</label>
                <label>
                    <input type="radio" name="role"
                    value="admin" onChange={handleChange}
                    checked={formData.role === "admin"} />
                Admin</label>
            </fieldset>


            <input className='btn' type="submit" value="Signup" />
        </form>}
        
        {Login && 
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <input type="email" name='email' value={LoginData.email}
            placeholder='email id' required onChange={handleChangeLogin}/>
            <input type="password" name='password' value={LoginData.password} 
            placeholder='password' required onChange={handleChangeLogin}/>
            {reset && <p style={{fontSize:"15px", color:"crimson"}}>Forgot password? <Link to='/reset'
            onClick={()=>{setReset(false)}}>Reset Password</Link></p>}
            <div>
                <p>Create account? <Link onClick={()=>{setLogin(false)}}>signup</Link></p>
            </div>
            <input className='btn' type="submit" value="Login" />
            <div>
                <p>Login with Otp? <Link to={`/sendOtp`}>sendOtp</Link></p>
            </div>
            </form>}
    </div>
  )
}

export default Signup