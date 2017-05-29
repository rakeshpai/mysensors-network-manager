import { connect } from 'react-redux';
import Gateway from '../components/Gateway';

export default connect(
  s => s,
  dispatch => {
    const d = (type, action) => dispatch({ type: `NETWORK/${type}`, ...action});

    return {
      onGatewayTypeChange: (networkId, gatewayType) => d('GATEWAY_TYPE_CHANGE', {networkId, gatewayType}),
      setDhcp: (networkId, dhcp) => d('SET_DHCP', { networkId, dhcp }),
      setIp: (networkId, ip) => d('SET_IP', { networkId, ip }),
      setGateway: (networkId, gateway) => d('SET_GATEWAY', { networkId, gateway}),
      setSubnet: (networkId, subnet) => d('SET_SUBNET', { networkId, subnet }),
      setSsid: (networkId, ssid) => d('SET_SSID', { networkId, ssid }),
      setPassword: (networkId, password) => d('SET_PASSWORD', { networkId, password })
    }
  }
)(Gateway);
