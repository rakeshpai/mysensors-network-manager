import { connect } from 'react-redux';
import Gateway from '../components/Gateway';
import { createHandlers as nodeHandlers } from './Node';

export default connect(
  s => s,
  dispatch => ({
    createHandlers: (networkId, nodeId) => {
      const d = (type, action) => dispatch({ type: `GATEWAY/${type}`, networkId, ...action});

      return {
        ...nodeHandlers(dispatch)(networkId, nodeId),

        setType: gatewayType => d('SET_TYPE', { gatewayType }),
        setDhcp: dhcp => d('SET_DHCP', { dhcp }),
        setIp: ip => d('SET_IP', { ip }),
        setGateway: gateway => d('SET_GATEWAY', { gateway }),
        setSubnet: subnet => d('SET_SUBNET', { subnet }),
        setSsid: ssid => d('SET_SSID', { ssid }),
        setPassword: password => d('SET_PASSWORD', { password }),
        setMode: mode => d('SET_MODE', { mode }),
        setServerPort: port => d('SET_SERVER_PORT', { port }),
        setServerMaxClients: maxClients => d('SET_SERVER_MAX_CLIENTS', { maxClients }),
        setControllerIp: controllerIp => d('SET_CONTROLLER_IP', { controllerIp }),
        setControllerPort: controllerPort => d('SET_CONTROLLER_PORT', { controllerPort }),
        setMqttHost: host => d('SET_MQTT_HOST', { host }),
        setMqttPort: port => d('SET_MQTT_PORT', { port }),
        setEthernetModule: ethernetModule => d('SET_ETHERNET_MODULE', { ethernetModule })
      }
    }
  })
)(Gateway);
