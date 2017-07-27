import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { migrateReducer } from './migrations';
import networks from './networks';

//import validate from '../lib/validate-network';

const combined = combineReducers({
  router,
  networks,
  version: x => typeof x === 'undefined' ? null : x
});

export default (state, action) => {
  const migrated = migrateReducer(state, action);
  const newState = combined(migrated, action);
  //console.log('Network validation errors:', validate(newState.networks[0]));
  return newState;
};
