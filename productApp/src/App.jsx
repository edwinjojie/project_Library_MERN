import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Signup } from './components/Signup'
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import BookDetail from './components/bookdetail'
import Profile from './components/UserProfile'
import { Update } from './components/UpdateUser'
import Arentedbook from './components/Arentedbook'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
      <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path="/book/:uniqueId" element={<BookDetail/>}></Route>
      <Route path='/user' element={<Profile/>}></Route>
      <Route path='/updateuser' element={<Update/>}></Route>
      <Route path="/rentedbooks" element={<Arentedbook />} />
      </Routes>
      
    </>
  )
}

export default App
