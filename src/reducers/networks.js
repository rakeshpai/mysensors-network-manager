export default (state = [], action) => {
  switch(action.type) {
    case 'CREATE_NETWORK': return [...state, action.network];
    default: return state;
  }
}

/*
export const network = (state = null, action) => {
  return state;
}

export const crossSliceReducer = (state, action) => {
  switch(action.type) {
    case 'CREATE_NETWORK': return { ...state, network: action.network };
    default: return state;
  }
}
*/
