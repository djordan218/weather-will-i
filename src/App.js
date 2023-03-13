import React, { useState } from 'react';
import Navigation from './Components/Navigation';
import Searchbar from './Components/SearchBar';
import Results from './Components/Results';
import './App.css';
import WeatherContext from './Hooks/WeatherContext';
import LoadingSpinner from './Components/LoadingSpinner';
import Questions from './Components/Questions';
import logo from './day-and-night.png';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDay, setIsDay] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [navLogo, setNavLogo] = useState(logo);
  const [theme, setTheme] = useState('light');

  return (
    <WeatherContext.Provider
      value={{
        weather,
        setWeather,
        location,
        setLocation,
        weatherIcon,
        setWeatherIcon,
        isLoading,
        setIsLoading,
        isDay,
        setIsDay,
        latitude,
        setLatitude,
        longitude,
        setLongitude,
        forecast,
        setForecast,
        navLogo,
        setNavLogo,
        theme,
        setTheme,
      }}
    >
      <Navigation />
      <Searchbar />
      {isLoading ? <LoadingSpinner /> : <Results />}
      {/* <Questions /> */}
    </WeatherContext.Provider>
  );
}

export default App;
