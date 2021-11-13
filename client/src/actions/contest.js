import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE, COMMENT, FETCH_BY_CREATOR, FETCH_CONTEST } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getContest = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchContest();

    dispatch({ type: FETCH_CONTEST, payload: { contest: data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};