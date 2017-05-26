import { radios } from '../lib/constants';

const radioByName = name => radios.find(r => r.name === name);

export default (state = [], action) => {
  switch(action.type) {
    case 'CREATE_NETWORK': return [ ...state, action.network ];

    case 'DELETE_NETWORK':
      const networkIndex = state.findIndex(n => n.id === action.networkId);
      if(networkIndex === -1) return state;
      return [
        ...state.slice(0, networkIndex),
        ...state.slice(networkIndex + 1)
      ];

    case 'CHANGE_RADIO': return state.map(network => {
      if(network.id !== action.networkId) return network;

      const radio = radioByName(action.radio);

      return {
        ...network,
        radio: action.radio,
        frequency: radio.frequencies.includes(network.frequency) ? network.frequency : radio.defaultFrequency
      };
    })

    case 'CHANGE_FREQUENCY': return state.map(network => {
      if(network.id !== action.networkId) return network;
      return { ...network, frequency: action.frequency };
    })

    default: return state;
  }
}
