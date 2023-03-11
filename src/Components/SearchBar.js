import React, { useState, useContext } from 'react';
import {
  InputGroup,
  Input,
  Button,
  Form,
  ListGroup,
  ListGroupItem,
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
    await fetch(
      `${apiUrl}/forecast.json?key=${apiKey}&q=${[city.lat, city.lon]}&aqi=no`
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setLocation(`${result.location.name}, ${result.location.region}`);
        setWeather(result);
        setLatitude(result.location.lat);
        setLongitude(result.location.lon);
        setForecast(result.forecast.forecastday[0].hour);
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
    setQuery('');
    setIsLoading(false);
  };
  return (
    <div className="container search">
      <div className="search-box">
        <Form>
          <InputGroup className="search-bar" size="lg">
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
            <Button className="search-btn">
              <MdSearch />
            </Button>
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
