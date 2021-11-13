import { FETCH_ALL, FETCH_CONTEST, FETCH_BY_SEARCH, FETCH_BY_CREATOR, FETCH_POST, CREATE, UPDATE, DELETE, LIKE, COMMENT } from '../constants/actionTypes';

export default (state = { isLoading: true, contests: [] }, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };
    case FETCH_CONTEST:
      return { ...state, contests: action.payload.contest };
    case CREATE:
      return { ...state, contests: [...state.contests, action.payload] };
    case UPDATE:
      return { ...state, contests: state.contests.map((contest) => (contest._id === action.payload._id ? action.payload : contest)) };
    case DELETE:
      return { ...state, contests: state.contests.filter((contest) => contest._id !== action.payload) };
    default:
      return state;
  }
};

