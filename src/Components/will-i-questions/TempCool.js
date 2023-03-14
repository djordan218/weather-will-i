import React, { useContext } from 'react';
import heater from '../../images/heater.png';
import hoodie from '../../images/hoodie.png';
import QuestionCard from './QuestionCard';
import { Typography } from '@mui/material';
import WeatherContext from '../../Hooks/WeatherContext';

export default function TempCool() {
  const { theme } = useContext(WeatherContext);

  const questions = [
    {
      id: 19,
      question: 'Will I need to bundle up?',
      answer: 'NO',
      detail:
        "These temps are PERFECT. You don't need to bundle up, but you should throw on your comfiest hoodie or sweatshirt to make the best of it.",
      image: `${hoodie}`,
    },
    {
      id: 20,
      question: 'Will I need to turn my heater on?',
      answer: 'YES',
      detail:
        'Although these temps are almost perfect, it can still get a little cool. Set that heater to a comfortable setting and sip on that hot toddy.',
      image: `${heater}`,
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
          Cooler temps today!
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
