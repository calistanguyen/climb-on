import React, { useState } from "react"
import NavBar from './NavBar'
import Dashboard from './Dashboard'
import EditLogForm from './EditLogForm'

const ClimbApp = () => {
  const [dashState, setDashState] = useState(true)
  const [climbLogState, setClimbLogState] = useState(false)
  const [viewLogState, setViewLogState] = useState(false);
  const [editLogState, setEditLogState] = useState(false);
  return (
    <div className='app'>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;800&display=swap" rel="stylesheet" />
      <NavBar setDashState={setDashState} setClimbLogState={setClimbLogState} dashState={dashState} climbLogState={climbLogState} viewLogState={viewLogState} setViewLogState={setViewLogState} editLogState={editLogState} setEditLogState={setEditLogState} />
      { dashState === true && <Dashboard />}
      {editLogState === true && <EditLogForm />}
    </div>
  );
}

export default ClimbApp; 