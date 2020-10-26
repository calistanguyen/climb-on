import React, { useState } from 'react'
import NavBar from './NavBar'
import Dashboard from './Dashboard'


const ClimbApp = () => {
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

export default ClimbApp