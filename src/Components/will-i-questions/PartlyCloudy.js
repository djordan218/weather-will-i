import React, { useContext } from 'react';
import sunscreen from '../../images/sunscreen.png';
import partlyCloudy from '../../images/partly-cloudy.png';
import QuestionCard from './QuestionCard';
import { Typography } from '@mui/material';
import WeatherContext from '../../Hooks/WeatherContext';

export default function PartlyCloudy() {
  const { theme } = useContext(WeatherContext);
  const questions = [
    {
      id: 5,
      question: 'Will I need sunglasses?',
      answer: 'YES',
      detail:
        "It isn't gonna be cloudy all day today! If the sun decides to part those clouds, it WILL slap you right in the cornea.",
      image: `${partlyCloudy}`,
    },
    {
      id: 6,
      question: 'Will I need to put on sunscreen?',
      answer: 'NO',
      detail:
        "More like SPF-noTHANKyou! Looks like it isn't going to be sunny enough for you to worry about that sunscreen stuff. But you do you, boo boo.",
      image: `${sunscreen}`,
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
          Partly cloudy up there.
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
