import React, { useContext } from 'react';
import sleet from '../../images/sleet.png';
import raincoat from '../../images/raincoat.png';
import QuestionCard from './QuestionCard';
import { Typography } from '@mui/material';
import WeatherContext from '../../Hooks/WeatherContext';

export default function Sleet() {
  const { theme } = useContext(WeatherContext);

  const questions = [
    {
      id: 11,
      question: 'Will I need to worry about road conditions?',
      answer: 'YES',
      detail:
        "Sleet is a tricky mistress. Is it slick? Is it mushy? Or is it totally driveable? I'd say drive with caution and don't try and test it.",
      image: `${sleet}`,
    },
    {
      id: 12,
      question: 'Will I need a raincoat?',
      answer: 'YES',
      detail:
        "Just because sleet can't make up its mind if its rain OR snow doesn't mean you need to be wet AND dry today. Wear a raincoat!",
      image: `${raincoat}`,
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
          Sleet is on the menu!
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
