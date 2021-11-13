import { START_LOADING, END_LOADING, FETCH_ONE_CONTEST, FETCH_CONTEST, FETCH_RECENT_CONTEST, FETCH_RECIPE } from '../constants/actionTypes';
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

export const getContestById = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const data = await api.fetchContestById(id);
    const recipeData = await api.fetchRecipe(data.data.recipe);
    dispatch({ type: FETCH_ONE_CONTEST, payload: { contest: data } });
    dispatch({ type: FETCH_RECIPE, payload: { recipes: [recipeData] } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getRecentContests = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchRecentContest();
    const recipeData1 = await api.fetchRecipe(data[0].recipe);
    const recipeData2 = await api.fetchRecipe(data[1].recipe);
    const recipeData3 = await api.fetchRecipe(data[2].recipe);
    const recipes = [recipeData1, recipeData2, recipeData3];
    dispatch({ type: FETCH_RECENT_CONTEST, payload: { contest: data} });
    dispatch({ type: FETCH_RECIPE, payload: { recipes: recipes } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
}

export const getRecipe = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchRecipe(id);
    dispatch({ type: FETCH_RECIPE, payload: { recipe: data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
}