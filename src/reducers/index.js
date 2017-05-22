import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { network, tempNetwork, crossSliceReducer } from './network';

const combined = combineReducers({
  router: routerReducer,
  
  network,
  tempNetwork,
});

export default (state, action) => {
  const intermediate = combined(state, action);
  return crossSliceReducer(intermediate, action);
};
