import { CREATE, UPDATE, DELETE, FETCH_SUBMISSION_BY_ID } from '../constants/actionTypes';

export default (state = { isLoading: true, submissions: []}, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };
    case 'CREATE_SUBMISSION':
      return { ...state, submissions: [...state.submissions, action.payload] };
    case 'FETCH_ALL_SUBMISSIONS':
      return {
        ...state,
        submissions: action.payload.data,
      };
    case 'FETCH_SUBMISSIONS_BY_CONTEST':
      return { ...state, submissions: action.payload.data };
    case 'FETCH_SUBMISSION_BY_ID':
      return { ...state, submission: action.payload.submission }
    case UPDATE:
      return { ...state, submissions: state.submissions.map((submissions) => (submissions._id === action.payload._id ? action.payload : submissions)) };
    case 'DELETE_SUBMISSION':
      return { ...state, submissions: state.submissions.filter((submissions) => submissions._id !== action.payload) };
    case 'COMMENT_SUBMISSION':
      return {
        ...state,
        submissions: state.submissions.map((submission) => {
          if (submission._id === +action.payload._id) {
            return action.payload;
          }
          return submission;
        }),
      };
    default:
      return state;
  }
};

