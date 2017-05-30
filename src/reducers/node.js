export default (state, action) => {
  const m = modified => ({ ...state, ...modified });

  switch(action.type.slice(('NODE/').length)) {
    case 'SET_DEVICE_KEY': return m({ key: action.key });
    default: return state;
  }
}
