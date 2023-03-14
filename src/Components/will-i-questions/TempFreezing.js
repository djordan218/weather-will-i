import React, { useContext } from 'react';
import freezing from '../../images/freezing.png';
import sink from '../../images/sink.png';
import QuestionCard from './QuestionCard';
import { Typography } from '@mui/material';
import WeatherContext from '../../Hooks/WeatherContext';

export default function TempFreezing() {
  const { theme } = useContext(WeatherContext);

  const questions = [
    {
      id: 21,
      question: 'Will I need to leave the faucet dripping?',
      answer: 'YES',
      detail:
        "These temps are even too cold for water to handle. If you don't want a pipe to burst, I'd say you should let those sinks drip the day away.",
      image: `${sink}`,
    },
    {
      id: 22,
      question: 'Will I need to bundle up?',
      answer: 'YES',
      detail:
        "You will need bundle up and then bundle on top of that bundle! We ain't kiddin'! The shivers gon'gitchya if you don't!",
      image: `${freezing}`,
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
          Freezing temps today!
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
