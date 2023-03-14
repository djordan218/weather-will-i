import React, { useContext } from 'react';
import QuestionCard from './QuestionCard';
import wateringPlants from '../../images/watering-plants.png';
import drought from '../../images/drought.png';
import { Typography } from '@mui/material';
import WeatherContext from '../../Hooks/WeatherContext';

export default function NoRain() {
  const { theme } = useContext(WeatherContext);

  const questions = [
    {
      id: 9,
      question: 'Will I need an umbrella?',
      answer: 'NO',
      detail: 'Keep that umbrella sheathed, you are safe from the rain today.',
      image: `${drought}`,
    },
    {
      id: 10,
      question: 'Will I need to water my plants?',
      answer: 'YES',
      detail:
        "I bet those little green goddesses are gonna be thirsty today. Go ahead, give 'em a drank.",
      image: `${wateringPlants}`,
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
          No rain in the forecast!
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
