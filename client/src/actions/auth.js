import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, router, handleError) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    handleError();
    console.log(error);
  }
};

export const signup = (formData, router, handleError) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    handleError();
    console.log(error);
  }
};

export const subscribePro = (user) => async (dispatch) => {
  try {
    await api.updateUser(user._id, user);
    
  } catch (error) {
    console.log(error);
  }
};
