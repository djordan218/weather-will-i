import React, { useContext } from 'react';
import road from '../../images/road.png';
import salt from '../../images/salt.png';
import QuestionCard from './QuestionCard';
import { Typography } from '@mui/material';
import WeatherContext from '../../Hooks/WeatherContext';

export default function Ice() {
  const { theme } = useContext(WeatherContext);
  const questions = [
    {
      id: 1,
      question: 'Will I need to watch the road conditions?',
      answer: 'YES',
      detail:
        "I'd keep an eye on the roads. If you gotta get out, you better be careful! Ice can make you do donuts - and not the kind anyone likes!",
      image: `${road}`,
    },
    {
      id: 2,
      question: 'Will I need to put salt on my walkways?',
      answer: 'YES',
      detail:
        "Ice ain't no joke, so I'd say put some salt out. It can be slicker than snot and you can go outside and break your humerus and trust me, that doesn't mean it's gonna be funny!",
      image: `${salt}`,
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
          It might be icy!
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
