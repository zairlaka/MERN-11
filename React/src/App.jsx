import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import AuthLayout from "./layouts/auth-layout";
import InstructorLayout from "./layouts/instructor-layout";
import InstructorDashboard from './components/instructorDashboard'


function App() {
  const [isLogin, setIsLogin] = useState(true)
  const updateState = (newState) => {
    setIsLogin(newState)
  }

  return (
    <>
      <AuthLayout />
      {/* <InstructorLayout /> */}
      {/* <InstructorDashboard /> */}
    </>
  )
}

export default App
