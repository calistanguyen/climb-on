import React, { useState } from "react"
import NavBar from '../components/NavBar'
import Dashboard from '../components/Dashboard'
import '../styles/global.scss'

const App = () => {
  const [dashState, setDashState] = useState(true)
  const [climbLogState, setClimbLogState] = useState(false)
  return (
    <div className='app'>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;800&display=swap" rel="stylesheet" />
      <NavBar setDashState={setDashState} setClimbLogState={setClimbLogState} dashState={dashState} climbLogState={climbLogState} />
      { dashState === true && <Dashboard />}
    </div>
  );
}

export default App; 