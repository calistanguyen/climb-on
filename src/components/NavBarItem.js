import React from 'react';

const NavBarItem = ({ text, active, onClick }) => { //Creates each of the nav bar items. I use SCSS to show if an item is active or not. 
    return (
        <div className={active ? 'nav-bar-item-active' : 'nav-bar-item-inactive'} onClick={onClick} >
            { text}
        </div >

    );
}

export default NavBarItem;