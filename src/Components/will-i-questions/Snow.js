import React, { useContext } from 'react';
import snowShovel from '../../images/snow-shovel.png';
import snowman from '../../images/snowman.png';
import QuestionCard from './QuestionCard';
import { Typography } from '@mui/material';
import WeatherContext from '../../Hooks/WeatherContext';

export default function Snow() {
  const { theme } = useContext(WeatherContext);

  const questions = [
    {
      id: 13,
      question: 'Will I need to shovel the driveway?',
      answer: 'YES',
      detail:
        'Did you know shoveling a driveway burns more calories than not shoveling?',
      image: `${snowShovel}`,
    },
    {
      id: 14,
      question: 'Will I need to build a snowman?',
      answer: 'YES',
      detail:
        "It is what it is. If it is snowing and you don't build a snowman, did it ever snow at all?",
      image: `${snowman}`,
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
          Might have some snow!
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
