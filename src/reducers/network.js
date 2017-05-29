const shorten = value => value.slice(('NETWORK/').length);

const modifyGateway = (state, modifier) => ({
  ...state,
  nodes: state.nodes.map(node => {
    if(node.type !== 'gateway') return node;
    return { ...node, ...modifier(node) }
  })
})

export default (state, action) => {
  switch(shorten(action.type)) {
    case 'GATEWAY_TYPE_CHANGE':
      return modifyGateway(state, _ => ({ gatewayType: action.gatewayType }));
    case 'SET_DHCP':
      return modifyGateway(state, gateway => ({
        ethernet: { ...gateway.ethernet, dhcp: action.dhcp }
      }));
    case 'SET_IP':
      return modifyGateway(state, gateway => ({
        ethernet: { ...gateway.ethernet, ip: action.ip }
      }));
    case 'SET_GATEWAY':
      return modifyGateway(state, gateway => ({
        ethernet: { ...gateway.ethernet, gateway: action.gateway }
      }));
    case 'SET_SUBNET':
      return modifyGateway(state, gateway => ({
        ethernet: { ...gateway.ethernet, subnet: action.subnet }
      }));
    case 'SET_SSID':
      return modifyGateway(state, gateway => ({
        wifi: { ...gateway.wifi, ssid: action.ssid }
      }));
    case 'SET_PASSWORD':
      return modifyGateway(state, gateway => ({
        wifi: { ...gateway.password, password: action.password }
      }))
    case 'SET_MODE':
      return modifyGateway(state, gateway => ({
        conn: { ...gateway.conn, type: action.mode }
      }))
    case 'SET_SERVER_PORT':
      return modifyGateway(state, gateway => ({
        conn: { ...gateway.conn, serverPort: action.port }
      }))
    case 'SET_SERVER_MAX_CLIENTS':
      return modifyGateway(state, gateway => ({
        conn: { ...gateway.conn, serverMaxClients: action.maxClients}
      }))
    case 'SET_CONTROLLER_IP':
      return modifyGateway(state, gateway => ({
        conn: { ...gateway.conn, controllerIp: action.controllerIp }
      }))
    case 'SET_CONTROLLER_PORT':
      return modifyGateway(state, gateway => ({
        conn: { ...gateway.conn, controllerPort: action.controllerPort }
      }))
    default: return state;
  }
}
