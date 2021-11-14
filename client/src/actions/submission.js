import { CREATE, START_LOADING, END_LOADING } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const createSubmission = (submission, history, contest) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.createSubmission(submission);
      contest.submissions = [...contest.submissions, data._id];
      const { data2 } = await api.updateContest(contest._id, contest);
      dispatch({ type: 'CREATE_SUBMISSION', payload: data});
      history.push(`/submissions/${data._id}`); 
      // dispatch({ type: 'UPDATE_CONTEST', payload: data2 });
      dispatch({ type: END_LOADING });
    } catch (error) { 
      console.log(error);
    }
}

export const deleteSubmission = (id) => async (dispatch) => {
  try {
    await await api.deleteSubmission(id);

    dispatch({ type: 'DELETE_SUBMISSION', payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const getSubmissions = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data} } = await api.fetchSubmissions();

    dispatch({ type: 'FETCH_ALL_SUBMISSIONS', payload: { data, currentPage, numberOfPages } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getSubmissionsByContest = (contest) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchSubmissionsByContest(contest);

    dispatch({ type: 'FETCH_SUBMISSIONS_BY_CREATOR', payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};