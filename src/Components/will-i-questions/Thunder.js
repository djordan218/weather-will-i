import React, { useContext } from 'react';
import thunder from '../../images/thunder.png';
import pets from '../../images/pets.png';
import QuestionCard from './QuestionCard';
import { Typography } from '@mui/material';
import WeatherContext from '../../Hooks/WeatherContext';

export default function Thunder() {
  const { theme } = useContext(WeatherContext);

  const questions = [
    {
      id: 27,
      question: 'Will I need to look out for thunder/lightning?',
      answer: 'YES',
      detail:
        "As much as I like a good light show, thunder and lightning don't really like to be played with. Stay away from any pointy metal objects, plz.",
      image: `${thunder}`,
    },
    {
      id: 28,
      question: 'Will I need to comfort my pets?',
      answer: 'YES',
      detail:
        "Your poor pets probably won't have a good time with all that scary noise outside. Just lie to them and say it's big bowling alley noises.",
      image: `${pets}`,
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
          Got thunder on the forecast!
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
