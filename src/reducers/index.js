import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import migrate from './migrations';
import networks from './networks';

const combined = combineReducers({
  router,
  networks,
  version: x => typeof x === 'undefined' ? null : x
});

export default (state, action) => {
  const migrated = migrate(state, action);
  const newState = combined(migrated, action);
  return newState;
};
