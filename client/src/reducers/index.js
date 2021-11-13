import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import contests from './contests';

export const reducers = combineReducers({ posts, auth, contests });
