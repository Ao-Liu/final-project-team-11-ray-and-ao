import { START_LOADING, END_LOADING, FETCH_SUBMISSION_BY_ID } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const createSubmission = (submission, history, contest, user, redirect) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.createSubmission(submission);
      contest.submissions = [...contest.submissions, data._id];
      await api.updateContest(contest._id, contest);
      await api.updateUser(user._id, user);
      dispatch({ type: 'CREATE_SUBMISSION', payload: data});
      dispatch({ type: "REFRESH" });
      redirect();
    } catch (error) { 
      console.log(error);
      redirect();
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
    dispatch({ type: 'FETCH_ALL_SUBMISSIONS', payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getSubmissionsByContest = (contest) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchSubmissionsByContest(contest);
    dispatch({ type: 'FETCH_SUBMISSIONS_BY_CONTEST', payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getSubmissionsByCreator = (creator) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchSubmissionsByCreator(creator);
    dispatch({ type: 'FETCH_SUBMISSIONS_BY_CONTEST', payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getSubmissionById = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchSubmissionById(id);
    dispatch({ type: FETCH_SUBMISSION_BY_ID, payload: { submission: data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
}

export const commentSubmission = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.commentSubmission(value, id);
    dispatch({ type: 'COMMENT_SUBMISSION', payload: data });
    return data.comments;
  } catch (error) {
    console.log(error);
  }
};