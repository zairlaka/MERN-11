import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import Login from "./components/login"
import Signup from "./components/signup"


function App() {
  const [isLogin, setIsLogin] = useState(true)
  const updateState = (newState) => {
    setIsLogin(newState)
  }

  return (
    <>
      {isLogin && <Login updateState={updateState}/>}
      {!isLogin && <Signup updateState={updateState} />}
    </>
  )
}

export default App
