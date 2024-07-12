import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Signup } from './components/Signup'
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <Login/> */}
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/Signup' element={<Signup/>}></Route>
    </Routes>
      {/* <Signup/> */}
    </>
  )
}

export default App
