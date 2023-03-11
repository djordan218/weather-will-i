import React, { useState, useContext } from 'react';
import {
  InputGroup,
  Input,
  Button,
  Form,
  ListGroup,
  ListGroupItem,
  InputGroupText,
} from 'reactstrap';
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
  } = useContext(WeatherContext);
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState(null);

  const apiUrl = 'http://api.weatherapi.com/v1';
  const apiKey = '86e73c7d02c041f6b48152838231003';

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
    <div className="container search">
      <div className="search-box">
        <Form>
          <InputGroup className="search-bar" size="lg">
            <InputGroupText className="search-btn">
              {' '}
              <MdSearch />
            </InputGroupText>
            <Input
              className="search-input"
              placeholder="Search here"
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              onKeyUp={(e) => {
                autoComplete(e);
              }}
              value={query}
            />
          </InputGroup>
        </Form>
        {search !== null ? (
          <div className="dynamic-search">
            <ListGroup className="search-list">
              {search.map((c) => (
                <ListGroupItem
                  key={c.id}
                  action
                  tag="button"
                  onClick={() => {
                    sendSearch(c);
                  }}
                >
                  {c.name}, {c.region}, {c.country}
                </ListGroupItem>
              ))}
            </ListGroup>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Searchbar;
