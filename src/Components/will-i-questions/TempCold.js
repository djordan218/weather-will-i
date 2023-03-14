import React, { useContext } from 'react';
import cold from '../../images/cold.png';
import coffee from '../../images/coffee.png';
import QuestionCard from './QuestionCard';
import { Typography } from '@mui/material';
import WeatherContext from '../../Hooks/WeatherContext';

export default function TempCold() {
  const { theme } = useContext(WeatherContext);

  const questions = [
    {
      id: 17,
      question: 'Will I be cold today?',
      answer: 'YES',
      detail:
        "You are going to need some warm clothes today! Crank that heater up and slip on your sexiest pair of wool socks... It's gonna be nipply.",
      image: `${cold}`,
    },
    {
      id: 18,
      question: 'Will I need hot coffee today?',
      answer: 'YES',
      detail:
        "These temperatures just don't call for any caffeinated beverag with ice in it. If I see you with an iced frap, I'm just going to assume you're a serial killer.",
      image: `${coffee}`,
    },
  ];

  return (
    <>
      <div className="card-columns">
        <Typography
          variant="button"
          display="block"
          gutterBottom
          sx={{
            lineHeight: '140%',
            fontSize: '20px',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '-10px',
            color: theme === 'dark' ? 'white' : 'black',
          }}
        >
          Cold day today!
        </Typography>
        <div className="card-rows">
          {questions.map((c) => {
            return <QuestionCard key={c.id} c={c} />;
          })}
        </div>
      </div>
    </>
  );
}
