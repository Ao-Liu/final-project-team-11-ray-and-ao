import React, { useState, useEffect} from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { getSubmissions, getSubmissionsByContest } from '../../actions/submission';
import Submission from './Submission';
import useStyles from './styles';
import { useParams, useHistory, Link } from 'react-router-dom';

function getParameterByName(name) {  
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(window.location.search);
  return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

const Submissions = ({}) => {
  var contest = getParameterByName("contest");
  console.log(`id: ${contest}`);
  const { isLoading, submissions} = useSelector((state) => state.submissions);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSubmissionsByContest(contest));
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
