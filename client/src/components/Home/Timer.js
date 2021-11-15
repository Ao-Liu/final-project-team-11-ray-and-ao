import React, { useEffect, useState } from "react";
import { Typography, Grid } from '@material-ui/core';
import useStyles from './styles';
import { mergeClasses } from "@material-ui/styles";

const Timer = ({date}) => {
  const classes = useStyles();
  const calculateTimeLeft = () => {
    const difference = +new Date(date) - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        m: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 500);
  });

  const timerComponents = [];
  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }
    timerComponents.push(
      <Typography variant="h1" component="h2" className={classes.timer}>
        {timeLeft[interval]}{interval}&nbsp;
      </Typography>
    );
  });
  if (timerComponents.length < 3) {
    timerComponents.push(
        <Typography variant="h1" component="h2" className={classes.timer}>
          0s&nbsp;
        </Typography>
      );
  }
  return (
    <div>
      {timerComponents.length ? <Grid container justifyContent="center" alignItems="center">{timerComponents}</Grid> : 
         <Grid container justifyContent="center" alignItems="center">
            <Typography style={{ fontWeight: 600, textAlign:'center', marginTop: '30px'}} variant="h1" component="h2">0h 0m 0s</Typography>
        </Grid>}
    </div>
  );
}

export default Timer;