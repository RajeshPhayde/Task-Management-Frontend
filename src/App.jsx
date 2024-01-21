import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './component/Signup'
import ResetPassword from './component/ResetPassword'
import Home from './component/Home'
import Navbar from './component/Navbar'
import Profile from './component/Profile'
import AuthProvider from './component/AuthProvider';
import AddTask from './component/AddTask'
import AllTask from './component/AllTask'
import SingleTask from './component/SingleTask'

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
          <Route path='/addtask' element={<AddTask/>}/>
          <Route path='/tasks' element={<SingleTask/>}/>
          {/* <Route path='/alltask' element={<AllTask/>}/> */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
