import React, { useState, useEffect} from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { getSubmissions } from '../../actions/submission';
import Submission from './Submission';
import useStyles from './styles';

const Submissions = ({}) => {
  const { isLoading, submissions} = useSelector((state) => state.submission);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubmissions());
  }, []);
  const classes = useStyles();

  if (!submissions.length && !isLoading) return 'No submissions';

  return (
    isLoading ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {submissions?.map((sub) => (
          <Grid key={sub._id} item xs={12} sm={12} md={6} lg={3}>
            <Submission submission={sub}/>
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Submissions;
