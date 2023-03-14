import React, { useContext } from 'react';
import shorts from '../../images/shorts.png';
import sweating from '../../images/sweating.png';
import QuestionCard from './QuestionCard';
import { Typography } from '@mui/material';
import WeatherContext from '../../Hooks/WeatherContext';

export default function TempWarm() {
  const { theme } = useContext(WeatherContext);

  const questions = [
    {
      id: 25,
      question: 'Will I need to wear shorts?',
      answer: 'YES',
      detail:
        "It is a beautiful temperature. It ain't scolding hot, but you still need to keep cool. Grab your shortest pair of shorts and go carpe the diem.",
      image: `${shorts}`,
    },
    {
      id: 26,
      question: 'Will I sweat a lot?',
      answer: 'NO',
      detail:
        "Although not certain, in these temperatures - if you're not doing pilates - you shouldn't sweat a whole lot. But don't go wearing your wool underwear now.",
      image: `${sweating}`,
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
          Warmer temps, but it ain't hot!
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
