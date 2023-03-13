import React, { useState, useContext } from 'react';
import { InputGroup, Input, Form, InputGroupText } from 'reactstrap';
import {
  MDBListGroup,
  MDBListGroupItem,
  MDBInput,
  MDBInputGroup,
  MDBBtn,
} from 'mdb-react-ui-kit';
import { alpha, styled } from '@mui/material/styles';
import { TextField } from '@mui/material';
import dayLogo from '../sun.png';
import nightLogo from '../moon.png';
import { MdSearch } from 'react-icons/md';
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
  } = useContext(WeatherContext);
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState(null);
  const [autoFocus, setAutoFocus] = useState(true);

  const apiUrl = 'http://api.weatherapi.com/v1';
  const apiKey = '86e73c7d02c041f6b48152838231003';

  const SearchTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: '#4476e9',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#4476e9',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
      },
      '&:hover fieldset': {
        borderColor: 'black',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#4476e9',
      },
    },
  });

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
    setAutoFocus(false);
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
        <SearchTextField
          key="secret"
          autoFocus={autoFocus}
          fullWidth
          label="What city you searchin' for?"
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
                  className={theme == 'dark' ? 'list-group-item-dark' : ''}
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
