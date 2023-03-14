import React, { useContext } from 'react';
import overcast from '../../images/overcast.png';
import sunscreen from '../../images/sunscreen2.png';
import QuestionCard from './QuestionCard';
import { Typography } from '@mui/material';
import WeatherContext from '../../Hooks/WeatherContext';

export default function Overcast() {
  const { theme } = useContext(WeatherContext);

  const questions = [
    {
      id: 3,
      question: 'Will I need sunglasses?',
      answer: 'NO',
      detail:
        'Let those beautiful eyes of yours free and enjoy the day just like the 100s of pictures of your pets in your phone... Unfiltered.',
      image: `${overcast}`,
    },
    {
      id: 4,
      question: 'Will I need sunscreen?',
      answer: 'NO',
      detail:
        "These clouds got your sweet pale, porcelain doll pricess skin covered. Let those arms go uncovered and you don't worry about a thing.",
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
          Cloudy day today!
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
