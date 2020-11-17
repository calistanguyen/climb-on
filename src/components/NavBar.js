import React from "react";
import Caribiner from "../imgs/Carabiner"
import NavBarItem from "./NavBarItem"

const NavBar = ({ setDashState, setClimbLogState, dashState, climbLogState, viewLogState, setViewLogState, editLogState, setEditLogState }) => {

  function clickDash() {
    setDashState(true)
    setClimbLogState(false)

  }

  function clickClimbLog() {
    setClimbLogState(true)
    setDashState(false)
    setViewLogState(true)
    setEditLogState(false)
  }

  function clickEditLog() {
    setViewLogState(false)
    setEditLogState(true)
  }

  return (
    <div className='side-bar'>
      <div className='logo'>
        climb on!
        <div className='svg'>
          <Caribiner />
        </div>
      </div>
      <NavBarItem text="Dashboard" active={dashState} onClick={clickDash} />
      <NavBarItem text="Climbing Log" active={climbLogState} onClick={clickClimbLog} />
      {climbLogState == true && <NavBarItem text="View Log" active={viewLogState} onClick={clickClimbLog} />}
      {climbLogState == true && <NavBarItem text="Add to Log" active={editLogState} onClick={clickEditLog} />}
    </div>
  );
}

export default NavBar; 