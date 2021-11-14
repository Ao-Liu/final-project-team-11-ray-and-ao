import { CREATE, START_LOADING } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const createSubmission = (submission, history) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.createSubmission(submission);
      dispatch({ type: CREATE, payload: data });
      history.push(`/submissions/${data._id}`);
    } catch (error) { 
      console.log(error);
    }
  }