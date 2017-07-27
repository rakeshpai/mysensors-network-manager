import { boardsById } from '../lib/constants';

export default (state, action) => {
  // 'dm' is for deepModify, modifies a key under the state object.
  const dm = (key, modified) => ({ ...state, [key]: { ...state[key], ...modified}});

  switch(action.type.slice(('GATEWAY/').length)) {
    case 'SET_TYPE': return {
      ...state,
      gatewayType: action.gatewayType,
      board: (state.board && action.gatewayType === 'esp8266' && boardsById[state.board].chip === 'esp8266')
        ? state.board
        : (state.board && boardsById[state.board].chip === 'atmega328') ? state.board : null
    };

    case 'SET_DHCP': return dm('ethernet', { dhcp: action.dhcp });
    case 'SET_IP': return dm('ethernet', { ip: action.ip });
    case 'SET_GATEWAY': return dm('ethernet', { gateway: action.gateway });
    case 'SET_SUBNET': return dm('ethernet', { subnet: action.subnet });
    case 'SET_ETHERNET_MODULE': return dm('ethernet', { module: action.ethernetModule});

    case 'SET_SSID': return dm('wifi', { ssid: action.ssid });
    case 'SET_PASSWORD': return dm('wifi', { password: action.password });

    case 'SET_MODE': return dm('conn', { type: action.mode });
    case 'SET_SERVER_PORT': return dm('conn', { serverPort: action.port });
    case 'SET_SERVER_MAX_CLIENTS': return dm('conn', { serverMaxClients: action.maxClients});
    case 'SET_CONTROLLER_IP': return dm('conn', { controllerIp: action.controllerIp });
    case 'SET_CONTROLLER_PORT': return dm('conn', { controllerPort: action.controllerPort });
    case 'SET_MQTT_HOST': return dm('conn', { mqttHost: action.host });
    case 'SET_MQTT_PORT': return dm('conn', { mqttPort: action.port });
    default: return state;
  }
}
