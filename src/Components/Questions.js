import React, { useContext, useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Questions.css';
import Rain from './will-i-questions/Rain';
import RainNot from './will-i-questions/RainNot';
import TempHot from './will-i-questions/TempHot';
import WeatherContext from '../Hooks/WeatherContext';
import TempWarm from './will-i-questions/TempWarm';
import TempCool from './will-i-questions/TempCool';
import TempCold from './will-i-questions/TempCold';
import TempFreezing from './will-i-questions/TempFreezing';
import Snow from './will-i-questions/Snow';
import Ice from './will-i-questions/Ice';
import PartlyCloudy from './will-i-questions/PartlyCloudy';
import Overcast from './will-i-questions/Overcast';
import Sleet from './will-i-questions/Sleet';
import Sunny from './will-i-questions/Sunny';
import Thunder from './will-i-questions/Thunder';
import Wind from './will-i-questions/Wind';

export default function Questions() {
  const {
    forecast,
    weather,
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
  } = useContext(WeatherContext);

  // this checks the values to populate the appropriate cards when search is sent
  // lots of if/else statements based on API return data
  // takes the average of the two days of forecast and determines which Temp component to render
  useEffect(() => {
    const maxTemp =
      (weather.forecast.forecastday[0].day.maxtemp_f +
        weather.forecast.forecastday[1].day.maxtemp_f) /
      2;
    if (maxTemp > 85) {
      setTempHot(true);
    }
    if (maxTemp < 85 && maxTemp > 70) {
      setTempWarm(true);
    }
    if (maxTemp < 70 && maxTemp > 45) {
      setTempCool(true);
    }
    if (maxTemp < 45 && maxTemp > 30) {
      setTempCold(true);
    }
    if (maxTemp < 30) {
      setTempFreezing(true);
    }
    forecast.forEach((f) => {
      if (f.condition.code === 1000) {
        setSunny(true);
      }
      if (f.condition.code === 1003) {
        setPartlyCloudy(true);
      }
      if (f.condition.code === 1006 || f.condition.code === 1009) {
        setOvercast(true);
      }
      if (f.will_it_rain === 1) {
        setRainy(true);
      }
      if (f.will_it_snow === 1) {
        setSnowy(true);
      }
      if (f.maxwind_mph > 15) {
        setWindy(true);
      }
      if (
        f.condition.code === 1069 ||
        f.condition.code === 1168 ||
        f.condition.code === 1204 ||
        f.condition.code === 1207 ||
        f.condition.code === 1252
      ) {
        setSleet(true);
      }
      if (
        f.condition.code === 1072 ||
        f.condition.code === 1198 ||
        f.condition.code === 1201 ||
        f.condition.code === 1237
      ) {
        setIce(true);
      }
      if (
        f.condition.code === 1087 ||
        f.condition.code === 1273 ||
        f.condition.code === 1276 ||
        f.condition.code === 1279 ||
        f.condition.code === 1282
      ) {
        setThunder(true);
      }
    });
  }, [forecast, weather]);

  return (
    <div className="card-rows">
      {tempHot ? <TempHot /> : null}
      {tempWarm ? <TempWarm /> : null}
      {tempCool ? <TempCool /> : null}
      {tempCold ? <TempCold /> : null}
      {tempFreezing ? <TempFreezing /> : null}
      {sunny ? <Sunny /> : null}
      {rainy ? <Rain /> : <RainNot />}
      {overcast ? <Overcast /> : null}
      {sleet ? <Sleet /> : null}
      {snowy ? <Snow /> : null}
      {ice ? <Ice /> : null}
      {thunder ? <Thunder /> : null}
      {windy ? <Wind /> : null}
    </div>
  );
}
