export default (state, action) => {
  const m = modified => ({ ...state, ...modified });

  switch(action.type.slice(('NODE/').length)) {
    case 'SET_DEVICE_KEY': return m({ key: action.key });
    case 'SET_PA': return m({ pa: action.pa });
    case 'SET_HW': return m({ hw: action.hw });
    case 'SET_BATTERY': return m({ batteryPowered: action.batteryPowered });
    default: return state;
  }
}
