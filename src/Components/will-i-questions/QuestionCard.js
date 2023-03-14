import React, { useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import WeatherContext from '../../Hooks/WeatherContext';

export default function QuestionCard({ c }) {
  const { theme } = useContext(WeatherContext);
  const style = {
    cardImg: {
      borderBottom: '3px solid black',
      borderRadius: '20px',
      padding: '15px',
    },
  };

  return (
    <>
      <Card
        sx={{
          width: 230,
          textAlign: 'center',
          border: '3px solid black',
          borderRadius: '20px',
          backgroundColor: theme === 'dark' ? '#332d2d' : 'white',
          color: theme === 'dark' ? 'white' : 'black',
        }}
      >
        <CardMedia component="img" style={style.cardImg} image={c.image} />
        <CardContent>
          <Typography variant="h6" component="div" sx={{ lineHeight: '120%' }}>
            {c.question}
          </Typography>
          <Typography
            variant="button"
            display="block"
            gutterBottom
            sx={{
              lineHeight: '140%',
              marginTop: '5px',
              fontSize: '20px',
              fontWeight: '700',
              color: c.answer === 'YES' ? 'green' : 'red',
            }}
            style={style.answerText}
          >
            {c.answer}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              lineHeight: '140%',
              marginTop: '4px',
              color: theme === 'dark' ? 'white' : 'black',
            }}
          >
            {c.detail}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
