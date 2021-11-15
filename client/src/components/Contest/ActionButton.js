import React, { useEffect, useState } from "react";
import { Typography, Grid, CircularProgress, Button } from '@material-ui/core';
import { useHistory, useLocation, useParams, Link } from 'react-router-dom';
import useStyles from './styles';
import { mergeClasses } from "@material-ui/styles";

const ActionButton = ({date, cid, handleClickAddSubmission}) => {
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

  let cnt = 0;
  Object.keys(timeLeft).forEach((interval) => {
    cnt++;
  });

  return (
    <div>
      {cnt == 0 ? 
        <Button variant="contained" component={Link} to={`/submissions?contest=${cid}`} size="large" color="primary" disableElevation style={{ backgroundColor: '#173A56', margin: '10px 20px' }}>
          View All Submissions
        </Button> : 
        <Button variant="contained" size="large" color="primary" onClick={handleClickAddSubmission} disableElevation style={{ backgroundColor: '#173A56', margin: '10px 20px' }}>
          Add Submission
        </Button>}
    </div>
  );
}

export default ActionButton;