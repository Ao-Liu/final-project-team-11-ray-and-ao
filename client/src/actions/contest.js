import { START_LOADING, END_LOADING, FETCH_CONTEST, FETCH_RECENT_CONTEST, FETCH_RECIPE } from '../constants/actionTypes';
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

export const getRecentContests = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchRecentContest();
    dispatch({ type: FETCH_RECENT_CONTEST, payload: { contest: data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
}

export const getRecipe = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchRecipe();
    dispatch({ type: FETCH_RECIPE, payload: { recipe: data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
}