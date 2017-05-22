import { combineReducers } from 'redux';
import { network, tempNetwork, crossSliceReducer } from './network';

const combined = combineReducers({
  network,
  tempNetwork,
});

export default (state, action) => {
  const intermediate = combined(state, action);
  return crossSliceReducer(intermediate, action);
};
