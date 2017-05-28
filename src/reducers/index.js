import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import networks from './networks';

const combined = combineReducers({
  router,
  networks
});

export default (state, action) => {
  const newState = combined(state, action);
  return newState;
};
