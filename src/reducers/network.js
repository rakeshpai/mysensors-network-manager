export const network = (state = null, action) => {
  return state;
}

export const tempNetwork = (state = {
  radio: 'NRF24L01+',
  channel: 77,
  frequency: 868
}, action) => {
  switch(action.type) {
    case 'ON_RADIO_CHANGE': return { ...state, radio: action.radio };
    case 'ON_CHANNEL_CHANGE': return { ...state, channel: action.channel };
    case 'ON_FREQUENCY_CHANGE': return { ...state, frequency: action.frequency };
    default: return state;
  }
}

export const crossSliceReducer = (state, action) => {
  switch(action.type) {
    case 'CREATE_NETWORK': return { ...state, network: action.network };
    default: return state;
  }
}
