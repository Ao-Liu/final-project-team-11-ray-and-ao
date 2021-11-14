import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import contests from './contests';
import submissions from './submission';

export const reducers = combineReducers({ posts, auth, contests, submissions });
