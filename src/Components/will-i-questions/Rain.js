import React, { useContext } from 'react';
import plant from '../../images/plant.png';
import umbrella from '../../images/umbrella.png';
import QuestionCard from './QuestionCard';
import { Typography } from '@mui/material';
import WeatherContext from '../../Hooks/WeatherContext';

export default function Rain() {
  const { theme } = useContext(WeatherContext);

  const questions = [
    {
      id: 7,
      question: 'Will I need an umbrella?',
      answer: 'YES',
      detail: "Let's just say if you don't bring one, you gun'git all wet.",
      image: `${umbrella}`,
    },
    {
      id: 8,
      question: 'Will I need to water my plants?',
      answer: 'NO',
      detail:
        "Nah man, it's gonna rain more than likely so let those leafy greens drink from the sky.",
      image: `${plant}`,
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
          Might get all wet!
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
