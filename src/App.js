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
  const [sunny, setSunny] = useState(false);
  const [partlyCloudy, setPartlyCloudy] = useState(false);
  const [overcast, setOvercast] = useState(false);
  const [rainy, setRainy] = useState(false);
  const [snowy, setSnowy] = useState(false);
  const [windy, setWindy] = useState(false);
  const [sleet, setSleet] = useState(false);
  const [ice, setIce] = useState(false);
  const [thunder, setThunder] = useState(false);
  const [tempCold, setTempCold] = useState(false);
  const [tempCool, setTempCool] = useState(false);
  const [tempWarm, setTempWarm] = useState(false);
  const [tempHot, setTempHot] = useState(false);
  const [tempFreezing, setTempFreezing] = useState(false);

  function notLoadingScreen() {
    return (
      <>
        <Results />
        {weather ? <Questions /> : null}
      </>
    );
  }

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
        sunny,
        setSunny,
        partlyCloudy,
        setPartlyCloudy,
        overcast,
        setOvercast,
        rainy,
        setRainy,
        snowy,
        setSnowy,
        windy,
        setWindy,
        sleet,
        setSleet,
        ice,
        setIce,
        thunder,
        setThunder,
        tempCold,
        setTempCold,
        tempCool,
        setTempCool,
        tempWarm,
        setTempWarm,
        tempHot,
        setTempHot,
        tempFreezing,
        setTempFreezing,
      }}
    >
      <Navigation />
      <Searchbar />
      {isLoading ? <LoadingSpinner /> : notLoadingScreen()}
    </WeatherContext.Provider>
  );
}

export default App;
