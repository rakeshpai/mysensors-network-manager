import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import networks from './networks';

export default combineReducers({
  router,
  networks
});

//export default (state, action) => combined(state, action);

/*
export default (state, action) => {
  const intermediate = combined(state, action);
  return crossSliceReducer(intermediate, action);
};
*/
