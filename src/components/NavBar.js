import React, { useState } from "react";
import Caribiner from "../imgs/Carabiner"
import NavBarItem from "./NavBarItem"
import PropTypes from 'prop-types';


const NavBar = ({ setDashState, setClimbLogState, dashState, climbLogState }) => {

  function clickDash() {
    setDashState(true)
    setClimbLogState(false)

  }

  function clickClimbLog() {
    setClimbLogState(true)
    setDashState(false)
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



    </div>
  );
}

// NavBar.propTypes = {
//   dashState: PropTypes.func,
//   climbLogState: PropTypes.func,
// }

export default NavBar; 