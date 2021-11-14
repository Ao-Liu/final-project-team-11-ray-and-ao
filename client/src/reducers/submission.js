import { CREATE, UPDATE, DELETE } from '../constants/actionTypes';

export default (state = { isLoading: true, submissions: []}, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };
    case CREATE:
      return { ...state, submissions: [...state.submissions, action.payload] };
    case UPDATE:
      return { ...state, submissions: state.submissions.map((submissions) => (submissions._id === action.payload._id ? action.payload : submissions)) };
    case DELETE:
      return { ...state, submissions: state.submissions.filter((submissions) => submissions._id !== action.payload) };
    default:
      return state;
  }
};

