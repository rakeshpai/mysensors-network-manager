import { radios } from '../lib/constants';
import { generateId } from '../lib/utils';
import { generateHexNumber } from '../lib/utils';

import networkReducer from './network';

const radioByName = name => radios.find(r => r.name === name);

export default (state = [], action) => {
  switch(action.type) {
    case 'CREATE_NETWORK': return [
      ...state,
      {
        ...action.network,
        hmac: generateHexNumber(64),
        aes: generateHexNumber(32),
        nodes: [
          {
            id: generateId(),
            type: 'gateway',
            gatewayType: 'serial'
          }
        ]
      }
    ];

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
    });

    case 'CHANGE_FREQUENCY': return state.map(network => {
      if(network.id !== action.networkId) return network;
      return { ...network, frequency: action.frequency };
    });

    case 'CHANGE_HMAC': return state.map(network => {
      if(network.id !== action.networkId) return network;
      return { ...network, hmac: action.hmac }
    });

    case 'CHANGE_AES': return state.map(network => {
      if(network.id !== action.networkId) return network;
      return { ...network, aes: action.aes }
    });

    default: break;
  }

  if(action.type.indexOf('NETWORK/') === 0) {
    return state.map(network => {
      if(network.id !== action.networkId) return network;
      return networkReducer(network, action);
    })
  }

  return state;
}
