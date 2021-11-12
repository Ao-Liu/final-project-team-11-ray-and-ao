import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Submission from './Submission';
import useStyles from './styles';

const Submissions = ({ setCurrentId }) => {
  const { subs, isLoading } = useSelector((state) => state.subs);
  const classes = useStyles();

  if (!subs.length && !isLoading) return 'No submissions';

  return (
    isLoading ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {subs?.map((sub) => (
          <Grid key={sub._id} item xs={12} sm={12} md={6} lg={3}>
            <Submission/>
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Submissions;
