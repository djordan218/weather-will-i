import React, { useState, useContext } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navigation.css';
import dayLogo from '../sun.png';
import nightLogo from '../moon.png';
import WeatherContext from '../Hooks/WeatherContext';
import { MdOutlineLocationOn } from 'react-icons/md';

function Navigation(args) {
  const { location, weatherIcon, navLogo } = useContext(WeatherContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  // useEffect(() => {
  //   const setTime = () => {
  //     const timeOfDay = new Date().toLocaleTimeString();
  //   };
  //   setTime();
  // }, []);

  return (
    <div>
      <Navbar className="ms-auto Navbar">
        <NavbarBrand className="nav-title" href="/">
          <img src={navLogo} className="nav-logo" alt="logo" />
          {'  '}weather, will i?
        </NavbarBrand>
        {location !== null ? (
          <NavbarText className="ms-auto">
            <img
              src={weatherIcon}
              className="weather-logo"
              alt="weatherConditions"
            />
            <MdOutlineLocationOn />
            {location}
          </NavbarText>
        ) : null}
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="http://danielthedeveloper.com">Portfolio</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/djordan218/">GitHub</NavLink>
            </NavItem>
          </Nav>
          <NavbarText className="nav-footer">
            Created by Daniel Jordan 2023
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Navigation;
