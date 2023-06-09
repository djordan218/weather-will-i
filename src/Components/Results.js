import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Results.css';
import WeatherContext from '../Hooks/WeatherContext';
import { ListGroup, ListGroupItem } from 'reactstrap';
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBCardSubTitle,
} from 'mdb-react-ui-kit';
import { BiWind } from 'react-icons/bi';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';

function Results(args) {
  const {
    weather,
    location,
    weatherIcon,
    latitude,
    longitude,
    forecast,
    theme,
  } = useContext(WeatherContext);

  // formats the date to be universal and compatible with iOS devices
  const formatDate = (date) => {
    const time = date.split(' ');
    const splitTime = time[1].split(':');
    let hours = splitTime[0];
    let minutes = splitTime[1];
    console.log(minutes);
    let amPm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const strTime = hours + ':' + minutes + amPm;

    return strTime;
  };

  // map icon at lat/long
  const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  // this formats the time in the forecast to be "1 PM", etc
  const hourlyTime = (time) => {
    const date = new Date(time).toLocaleTimeString();
    const hour = date.split(':')[0];
    const amPm = date.split(' ').pop();
    return `${hour} ${amPm}`;
  };

  return (
    <div
      className={
        theme === 'dark'
          ? 'container-fluid results-div darkTheme'
          : 'container-fluid results-div'
      }
    >
      {location !== null ? (
        <div className="container search-results">
          <MDBCard
            className={theme === 'dark' ? 'city-card darkTheme' : 'city-card'}
          >
            <MDBCardBody
              className={
                theme === 'dark' ? 'text-center darkTheme' : 'text-center'
              }
            >
              <MDBCardTitle tag="h5">{location}</MDBCardTitle>
              <MDBCardText>
                Local Time: {formatDate(weather.location.localtime)}
              </MDBCardText>
              <div id="map">
                <MapContainer
                  className="map"
                  center={[latitude, longitude]}
                  zoom={10}
                  scrollWheelZoom={false}
                  style={{ width: '100%', height: '30vh' }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker icon={DefaultIcon} position={[latitude, longitude]}>
                    <Popup>{location}</Popup>
                  </Marker>
                </MapContainer>
              </div>
            </MDBCardBody>
            <ListGroup
              className={
                theme === 'dark' ? 'list-group darkTheme' : 'list-group'
              }
              flush
            >
              <ListGroupItem
                className={theme === 'dark' ? 'darkTheme' : ''}
                tag="h6"
              >
                <img
                  alt="weather-icon"
                  className="weather-icon"
                  src={weatherIcon}
                />{' '}
                Current Condition: {weather.current.condition.text}
              </ListGroupItem>
              <ListGroupItem
                className={theme === 'dark' ? 'darkTheme' : ''}
                tag="h6"
              >
                Feels like: {weather.current.feelslike_f}&#8457; with{' '}
                {weather.current.humidity}% humidity
              </ListGroupItem>
              <ListGroupItem
                className={theme === 'dark' ? 'darkTheme' : ''}
                tag="h6"
              >
                <BiWind /> Wind is {weather.current.wind_mph}mph from the{' '}
                {weather.current.wind_dir}
              </ListGroupItem>
            </ListGroup>
          </MDBCard>
        </div>
      ) : null}
      {forecast !== null ? (
        <div className="forecast-container">
          {forecast.map((h) => (
            <MDBCard
              key={h.time_epoch}
              className={
                theme === 'dark'
                  ? 'forecast-card shadow-0 darkTheme'
                  : 'forecast-card shadow-0'
              }
            >
              <MDBCardImage
                className="forecast-card-img"
                alt="Card image cap"
                src={h.condition.icon}
              />
              <MDBCardBody className="text-center">
                <MDBCardTitle tag="h5">{hourlyTime(h.time)}</MDBCardTitle>
                <MDBCardText tag="h6">{h.feelslike_f}&#8457;</MDBCardText>
                <MDBCardText className="forecast-subtitle">
                  {h.condition.text}
                </MDBCardText>
                {h.chance_of_rain > 0 ? (
                  <MDBCardSubTitle className="forecast-footer">
                    Rain <b>{h.chance_of_rain}%</b>
                  </MDBCardSubTitle>
                ) : null}
              </MDBCardBody>
            </MDBCard>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default Results;
