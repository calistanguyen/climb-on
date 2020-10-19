import React from "react";
import Caribiner from "../imgs/Carabiner"
import NavBarItem from "./NavBarItem"

const NavBar = () => {
  return (
    <div className = 'side-bar'>
      <div className = 'logo'> 
        climb on!
        <div className = 'svg'> 
          <Caribiner/>
        </div>
      </div>
      <NavBarItem text="Dashboard"/>
      <NavBarItem text="Climbing Log"/>

      

    </div>
  );
}

export default NavBar; 