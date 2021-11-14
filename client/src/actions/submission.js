import { CREATE, START_LOADING, END_LOADING } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const createSubmission = (submission, history, contest) => async (dispatch) => {
    try {
      const { data } = await api.createSubmission(submission);
      console.log("data: " + data);
      console.log("contest: " + contest);
      contest.submissions.push(data._id)
      const { data2 } = await api.updateContest(contest._id, contest);
      dispatch({ type: 'CREATE_SUBMISSION', payload: data });
      dispatch({ type: 'UPDATE_CONTEST', payload: data2 });
      history.push(`/submissions/${data._id}`);
    } catch (error) { 
      console.log(error);
    }
}