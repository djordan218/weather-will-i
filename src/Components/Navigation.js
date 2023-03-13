import React, { useContext } from 'react';
import {
  MDBNavbar,
  MDBIcon,
  MDBNavbarBrand,
  MDBBtn,
  MDBSwitch,
} from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navigation.css';
import WeatherContext from '../Hooks/WeatherContext';

function Navigation(args) {
  const { navLogo, theme, setTheme } = useContext(WeatherContext);
  const setUserTheme = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
    console.log('theme is', theme);
  };

  // useEffect(() => {
  //   const setTime = () => {
  //     const timeOfDay = new Date().toLocaleTimeString();
  //   };
  //   setTime();
  // }, []);

  return (
    <MDBNavbar
      fluid
      className={
        theme == 'light' ? 'navbar-light bg-light' : 'navbar-dark bg-dark'
      }
      id="navbar"
    >
      <div>
        <MDBNavbarBrand className="nav-title" href="/">
          <img src={navLogo} className="nav-logo" alt="logo" />
          {'  '}weather, will i?
        </MDBNavbarBrand>
      </div>
      <div className="d-flex align-items-center">
        <MDBBtn
          className="mx-2"
          color="tertiary"
          rippleColor="light"
          onClick={() => {
            setUserTheme();
          }}
        >
          {theme === 'light' ? (
            <MDBIcon fas className="ms-1 light-theme" icon="sun" size="3x" />
          ) : (
            <MDBIcon far className="ms-1 dark-theme" icon="moon" size="3x" />
          )}
        </MDBBtn>
      </div>
    </MDBNavbar>
  );
}

export default Navigation;
