import React, { useState, useContext } from 'react';
import { MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import { TextField } from '@mui/material';
import dayLogo from '../sun.png';
import nightLogo from '../moon.png';
import './Searchbar.css';
import WeatherContext from '../Hooks/WeatherContext';

function Searchbar() {
  const {
    setLocation,
    setIsLoading,
    setWeatherIcon,
    setWeather,
    setLatitude,
    setLongitude,
    setForecast,
    setNavLogo,
    theme,
    setSunny,
    setPartlyCloudy,
    setOvercast,
    setRainy,
    setSnowy,
    setWindy,
    setSleet,
    setIce,
    setThunder,
    setTempCold,
    setTempCool,
    setTempWarm,
    setTempHot,
    setTempFreezing,
  } = useContext(WeatherContext);
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState(null);

  const apiUrl = 'http://api.weatherapi.com/v1';
  const apiKey = '86e73c7d02c041f6b48152838231003';

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // autocomplete when searching
  // calls API as the user search is > 0
  const autoComplete = async (e) => {
    await fetch(`${apiUrl}/search.json?key=${apiKey}&q=${query}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.length > 0) {
          setSearch(result);
        } else {
          setSearch(null);
        }
      });
  };

  const sendSearch = async (city) => {
    setIsLoading(true);
    setSearch(null);
    setSunny(false);
    setPartlyCloudy(false);
    setOvercast(false);
    setRainy(false);
    setSnowy(false);
    setWindy(false);
    setSleet(false);
    setIce(false);
    setThunder(false);
    setTempCold(false);
    setTempCool(false);
    setTempWarm(false);
    setTempHot(false);
    setTempFreezing(false);
    // using timeEpoch to get current time, filters out past results in forecast
    const timeEpoch = Math.round(new Date().getTime() / 1000);

    // calling API and getting 2 days of results
    await fetch(
      `${apiUrl}/forecast.json?key=${apiKey}&q=${[
        city.lat,
        city.lon,
      ]}&days=2&aqi=no&alerts=no`
    )
      .then((res) => res.json())
      .then((result) => {
        setLocation(`${result.location.name}, ${result.location.region}`);
        setWeather(result);
        setLatitude(result.location.lat);
        setLongitude(result.location.lon);

        // getting two separate keys in object and then mapping over to push future dates into current date to make one object
        const currentDayForecastRes = result.forecast.forecastday[0].hour;
        const nextDayForecastRes = result.forecast.forecastday[1].hour;
        nextDayForecastRes.map((i) => currentDayForecastRes.push(i));
        const futureForecast = currentDayForecastRes.filter((e) => {
          return e.time_epoch >= timeEpoch;
        });

        // setting state for forecast with times that are in the future
        setForecast(futureForecast);

        // handling icons of current weather based on is_day
        let icon = result.current.condition.icon.split('/');
        let weatherImg = icon[icon.length - 1];
        if (result.current.is_day === 1) {
          setWeatherIcon(`../icons/1/${weatherImg}`);
          setNavLogo(dayLogo);
        } else {
          setWeatherIcon(`../icons/0/${weatherImg}`);
          setNavLogo(nightLogo);
        }
      });

    // clearing search bar
    setQuery('');
    setIsLoading(false);
  };

  return (
    <div className={theme === 'dark' ? 'search search-div-dark' : 'search'}>
      <div className="search-box">
        <TextField
          sx={{
            '& label.Mui-focused': {
              color: 'black',
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: 'black',
              borderWidth: '2px',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'black',
                borderWidth: '2px',
              },
              '&:hover fieldset': {
                borderColor: 'black',
                borderWidth: '2px',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'black',
                borderWidth: '2px',
              },
            },
            input: {
              textAlign: 'center',
              fontSize: '20px',
              '&::placeholder': {
                opacity: 0.5,
              },
            },
            ...(theme === 'dark' && {
              '& label.Mui-focused': {
                color: '#4476e9',
                borderWidth: '2px',
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: '#4476e9',
                borderWidth: '2px',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#4476e9',
                  borderWidth: '2px',
                },
                '&:hover fieldset': {
                  borderColor: '#4476e9',
                  borderWidth: '2px',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4476e9',
                  borderWidth: '2px',
                },
              },
              input: {
                textAlign: 'center',
                color: 'white',
                fontSize: '20px',
                '&::placeholder': {
                  opacity: 0.5,
                },
              },
            }),
          }}
          key="secret"
          autoFocus
          fullWidth
          placeholder="What city you searchin' for?"
          onChange={(e) => {
            handleChange(e);
          }}
          onKeyUp={(e) => {
            autoComplete(e);
          }}
          value={query}
          className={theme === 'dark' ? 'search-input-dark' : 'search-input'}
        />
        {search !== null ? (
          <div className="dynamic-search">
            <MDBListGroup className="search-list" light small>
              {search.map((c) => (
                <MDBListGroupItem
                  className={theme === 'dark' ? 'list-group-item-dark' : ''}
                  key={c.id}
                  action
                  tag="button"
                  onClick={() => {
                    sendSearch(c);
                  }}
                >
                  <div className="city-text-container">
                    <div className="fw-bold">
                      {c.name}, {c.region}
                    </div>
                    <div className="text-muted ">{c.country}</div>
                  </div>
                </MDBListGroupItem>
              ))}
            </MDBListGroup>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Searchbar;
