import { CREATE, START_LOADING, END_LOADING } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const createSubmission = (submission, history, contest) => async (dispatch) => {
    try {
      dispatch({ type: "NO_REFRESH" });
      const { data } = await api.createSubmission(submission);
      contest.submissions = [...contest.submissions, data._id];
      const { data2 } = await api.updateContest(contest._id, contest);
      dispatch({ type: 'CREATE_SUBMISSION', payload: data});
      // history.push(`/submissions/${data._id}`); 
      dispatch({ type: "REFRESH" });
    } catch (error) { 
      console.log(error);
    }
}