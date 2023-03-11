import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Results.css';
import WeatherContext from '../Hooks/WeatherContext';
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem,
  CardImg,
  CardSubtitle,
} from 'reactstrap';
import { BiWind } from 'react-icons/bi';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';

function Results(args) {
  const { weather, location, weatherIcon, latitude, longitude, forecast } =
    useContext(WeatherContext);

  const formatDate = (date) => {
    const time = date.split(' ');
    const splitTime = time[1].split(':');
    let hours = splitTime[0];
    let minutes = splitTime[1];
    let amPm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    const strTime = hours + ':' + minutes + amPm;
    return strTime;
  };

  const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  const hourlyTime = (time) => {
    const date = new Date(time).toLocaleTimeString();
    const hour = date.split(':')[0];
    const amPm = date.split(' ').pop();
    return `${hour} ${amPm}`;
  };

  return (
    <div className="container results-div">
      {location !== null ? (
        <div className="container search-results">
          <div id="map">
            <MapContainer
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
          <Card className="city-card">
            <CardBody className="text-center">
              <CardTitle tag="h5">{location}</CardTitle>
              <CardText>
                Local Time: {formatDate(weather.location.localtime)}
              </CardText>
            </CardBody>
            <ListGroup className="list-group" flush>
              <ListGroupItem tag="h6">
                <img
                  alt="weather-icon"
                  className="weather-icon"
                  src={weatherIcon}
                />{' '}
                Current Condition: {weather.current.condition.text}
              </ListGroupItem>
              <ListGroupItem tag="h6">
                Feels like: {weather.current.feelslike_f}&#8457; with{' '}
                {weather.current.humidity}% humidity
              </ListGroupItem>
              <ListGroupItem tag="h6">
                <BiWind /> Wind is {weather.current.wind_mph}mph from the{' '}
                {weather.current.wind_dir}
              </ListGroupItem>
            </ListGroup>
          </Card>
        </div>
      ) : null}
      {forecast !== null ? (
        <div className="forecast-container">
          {forecast.map((h) => (
            <Card key={h.time_epoch} className="forecast-card">
              <CardImg
                className="forecast-card-img"
                alt="Card image cap"
                src={h.condition.icon}
                top
              />
              <CardBody className="text-center">
                <CardTitle tag="h5">{hourlyTime(h.time)}</CardTitle>
                <CardText tag="h6">{h.feelslike_f}&#8457;</CardText>
                {h.chance_of_rain > 0 ? (
                  <CardSubtitle className="forecast-subtitle">
                    Rain <b>{h.chance_of_rain}%</b>
                  </CardSubtitle>
                ) : null}
                <CardSubtitle className="forecast-subtitle">
                  {h.condition.text}
                </CardSubtitle>
              </CardBody>
            </Card>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default Results;
