// import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import './css/Navbar.css'
import { useAuth } from './AuthProvider';

const Navbar = () => {

  let {user, logout} = useAuth();
  let navigate = useNavigate();

  let handleLogout = ()=>{
    logout();
    navigate("/")
    window.location.reload()
  }

  return (
    <nav>
        <NavLink to='/home'>Home</NavLink>
        <NavLink to='/profile'>Profile</NavLink>
        <NavLink to='/addtask'>Add task</NavLink>
        <NavLink to='/tasks'>Tasks</NavLink>
        {/* <NavLink to='/alltask'>All task</NavLink> */}

        
        {!user && <NavLink to='/'>Signup/Login</NavLink>}
        {user && <button onClick={handleLogout}>Logout</button>}
        {/* <li><NavLink to='/home'>Home</NavLink></li> */}
    </nav>
  )
}

export default Navbar