import { connect } from 'react-redux';
import Gateway from '../components/Gateway';

export default connect(
  s => s,
  dispatch => {
    const d = (type, action) => dispatch({ type: `NETWORK/${type}`, ...action});

    return {
      createHandlers: networkId => ({
        onGatewayTypeChange: gatewayType => d('GATEWAY_TYPE_CHANGE', { networkId, gatewayType }),
        setDhcp: dhcp => d('SET_DHCP', { networkId, dhcp }),
        setIp: ip => d('SET_IP', { networkId, ip }),
        setGateway: gateway => d('SET_GATEWAY', { networkId, gateway}),
        setSubnet: subnet => d('SET_SUBNET', { networkId, subnet }),
        setSsid: ssid => d('SET_SSID', { networkId, ssid }),
        setPassword: password => d('SET_PASSWORD', { networkId, password }),
        setMode: mode => d('SET_MODE', { networkId, mode }),
        setServerPort: port => d('SET_SERVER_PORT', { networkId, port }),
        setServerMaxClients: maxClients => d('SET_SERVER_MAX_CLIENTS', { networkId, maxClients}),
        setControllerIp: controllerIp => d('SET_CONTROLLER_IP', { networkId, controllerIp }),
        setControllerPort: controllerPort => d('SET_CONTROLLER_PORT', { networkId, controllerPort })
      })
    }
  }
)(Gateway);
