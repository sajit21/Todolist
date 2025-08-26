import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'

const App = () => {
  return (
    <div className='max-w-screen-2xl  bg-custom flex justify-items-center '>
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        {/* <Route path="/dashboard" element={user ? <dashboard/> : <Signup/>}/> */}
      </Routes>
    </div>
  )
}

export default App