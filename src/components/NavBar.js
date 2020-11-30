import React from "react";
import Caribiner from "../imgs/Carabiner"
import NavBarItem from "./NavBarItem"
import { setUser } from "../services/auth"
import { navigate } from "gatsby"

const NavBar = ({ setDashState, setClimbLogState, dashState, climbLogState, viewLogState, setViewLogState, editLogState, setEditLogState }) => { //My NavBar component that takes in NavBarItem components 

  function clickDash() { //these functions handle the state of the navbar and what nav items have been clicked
    setClimbLogState(false)
    setDashState(true)

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

  function handleLogout() {
    navigate('/');
    setUser({});
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
      <div className='logout' onClick={handleLogout}>Log out</div>
    </div>
  );
}

export default NavBar; 