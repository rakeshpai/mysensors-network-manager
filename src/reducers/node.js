export default (state, action) => {
  const m = modified => ({ ...state, ...modified });
  const mb = modified => ({ ...state, battery: { ...state.battery, ...modified }})

  switch(action.type.slice(('NODE/').length)) {
    case 'SET_NAME': return m({ name: action.name });
    case 'SET_DEVICE_KEY': return m({ key: action.key });
    case 'SET_PA': return m({ pa: action.pa });
    case 'SET_HW': return m({ hw: action.hw });

    case 'SET_BATTERY_POWERED': return mb({ powered: action.batteryPowered });
    case 'SET_BATTERY_MIN': return mb({ min: action.min });
    case 'SET_BATTERY_MAX': return mb({ max: action.max });
    case 'SET_BATTERY_MEASURE': return mb({ measure: action.measure });
    case 'SET_BATTERY_MEASURE_PIN': return mb({ measurePin: action.measurePin });
    case 'SET_BATTERY_VPB': return mb({ voltsPerBit: action.voltsPerBit });
    default: return state;
  }
}
