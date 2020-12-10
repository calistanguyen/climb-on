import React, { useState, useEffect } from "react"
import NavBar from './NavBar'
import Dashboard from './Dashboard'
import EditLogForm from './EditLogForm'
import ViewLog from './ViewLog'

const ClimbApp = () => { //overarching component that holds the nav bar and each main component of my app
  const [dashState, setDashState] = useState(true) //using state hooks to determine what is the current component showing -- provides the nav bar functionality
  const [climbLogState, setClimbLogState] = useState(false)
  const [viewLogState, setViewLogState] = useState(false);
  const [editLogState, setEditLogState] = useState(false);
  return (
    <div className='app'>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;800&display=swap" rel="stylesheet" />
      <NavBar setDashState={setDashState} setClimbLogState={setClimbLogState} dashState={dashState} climbLogState={climbLogState} viewLogState={viewLogState} setViewLogState={setViewLogState} editLogState={editLogState} setEditLogState={setEditLogState} />
      { dashState === true && <Dashboard />}
      {editLogState === true && <EditLogForm />}
      {viewLogState === true && <ViewLog />}
    </div>
  );
}

export default ClimbApp; 