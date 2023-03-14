import React, { useContext } from 'react';
import wind from '../../images/wind.png';
import windyHat from '../../images/windy-hat.png';
import QuestionCard from './QuestionCard';
import { Typography } from '@mui/material';
import WeatherContext from '../../Hooks/WeatherContext';

export default function Wind() {
  const { theme } = useContext(WeatherContext);

  const questions = [
    {
      id: 29,
      question: 'Will I need to worry about wind?',
      answer: 'YES',
      detail:
        "Depending on how windy it is, I'd say make sure you don't have a shed taking flight against its will.",
      image: `${wind}`,
    },
    {
      id: 30,
      question: 'Will I need to wear a hat?',
      answer: 'NO',
      detail:
        "It probably isn't a good idea. Hats make great kites. But they ain't kites.",
      image: `${windyHat}`,
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
          Windy day today!
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
