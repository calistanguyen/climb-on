import React from 'react';

import PropTypes from 'prop-types'

const NavBarItem = ({ text, active, onClick }) => {
    return (
        <div className={active ? 'nav-bar-item-active' : 'nav-bar-item-inactive'} onClick={onClick} >
            { text}
        </div >

    );
}

export default NavBarItem;