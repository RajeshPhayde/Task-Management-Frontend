import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './component/Signup'
import ResetPassword from './component/ResetPassword'
import Home from './component/Home'
import Navbar from './component/Navbar'
import Profile from './component/Profile'
import AuthProvider from './component/AuthProvider';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Signup/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/reset' element={<ResetPassword/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
