import { FETCH_CONTEST, CREATE,FETCH_ONE_CONTEST, UPDATE, DELETE, FETCH_RECENT_CONTEST, FETCH_RECIPE } from '../constants/actionTypes';

export default (state = { isLoading: true, contests: [], recipes: [] }, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };
    case FETCH_CONTEST:
      return { ...state, contests: action.payload.contest };
    case FETCH_ONE_CONTEST:
      return { ...state, contests: action.payload.contest};
    case FETCH_RECENT_CONTEST:
      return { ...state, contests: action.payload.contest };
    case FETCH_RECIPE:
      return { ...state, recipes: action.payload.recipes };
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

