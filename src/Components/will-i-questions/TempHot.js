import React, { useContext } from 'react';
import hot from '../../images/hot.png';
import airConditioner from '../../images/air-conditioner.png';
import QuestionCard from './QuestionCard';
import { Typography } from '@mui/material';
import WeatherContext from '../../Hooks/WeatherContext';

export default function TempHot() {
  const { theme } = useContext(WeatherContext);
  const questions = [
    {
      id: 23,
      question: 'Will I need to drink more water?',
      answer: 'YES',
      detail:
        "Listen. It's hot. We KNOW. If you don't want to make a fool of yourself and pass out, go drink some water!",
      image: `${hot}`,
    },
    {
      id: 24,
      question: 'Will I need to leave the A/C on?',
      answer: 'YES',
      detail:
        "Let's just say if you don't turn on your air conditioning, you're gonna come home to a bad time.",
      image: `${airConditioner}`,
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
          Hot day today!
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
