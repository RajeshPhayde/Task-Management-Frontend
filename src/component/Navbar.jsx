// import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import './css/Navbar.css'
import { useAuth } from './AuthProvider';

const Navbar = () => {

  let {user, logout} = useAuth();
  let navigate = useNavigate();

  let handleLogout = ()=>{
    logout();
    localStorage.removeItem("token")
    alert("You are logged out, redirecting to home page")
    navigate("/home")
  }

  return (
    <nav>
        <NavLink to='/home'>Home</NavLink>
        <NavLink to='/profile'>Profile</NavLink>
        <NavLink to='/addtask'>Add task</NavLink>
        <NavLink to='/tasks'>Tasks</NavLink>
        {/* <NavLink to='/alltask'>All task</NavLink> */}

        
        {!user && <NavLink to='/'>Signup/Login</NavLink>}
        {user && 
        <button className='logout' onClick={handleLogout}>Logout</button>
        }
    </nav>
  )
}

export default Navbar