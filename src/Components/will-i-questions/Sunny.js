import React, { useContext } from 'react';
import sunglasses from '../../images/sunglasses.png';
import sunscreen from '../../images/sunscreen3.png';
import QuestionCard from './QuestionCard';
import { Typography } from '@mui/material';
import WeatherContext from '../../Hooks/WeatherContext';

export default function Sunny() {
  const { theme } = useContext(WeatherContext);

  const questions = [
    {
      id: 15,
      question: 'Will I need sunscreen today?',
      answer: 'YES',
      detail:
        "If you really like your skin and you really don't want to have a painful hot shower tonight... Put on the screen, bruh.",
      image: `${sunscreen}`,
    },
    {
      id: 16,
      question: 'Will I need sunglasses today?',
      answer: 'YES',
      detail:
        "If you don't want to be squinting all day, then I highly suggest you slap on those sweet sunnies.",
      image: `${sunglasses}`,
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
          It just might be sunny!
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
