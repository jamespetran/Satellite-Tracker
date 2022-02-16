import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as ProfileIcon } from '../../icons/account.svg';
import { ReactComponent as SatelliteIcon } from '../../icons/satellite.svg';
import './Nav.css';

function Nav() {

  return (
    <div className="nav" id="bottom-nav">
      <div id="icon-container">
        <Link className="navLink" to="/home">
          <SatelliteIcon className="nav-icon" />
          <br />
        </Link>
        <Link className="navLink" to="/user">
          <ProfileIcon className="nav-icon" />
          <br />
        </Link>
      </div>
    </div>
  );
}

export default Nav;
