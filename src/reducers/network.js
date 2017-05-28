const shorten = value => value.slice(('NETWORK/').length);

export default (state, action) => {
  switch(shorten(action.type)) {
    case 'GATEWAY_TYPE_CHANGE': return {
      ...state,
      nodes: state.nodes.map(node => {
        if(node.type !== 'gateway') return node;
        return { ...node, gatewayType: action.gatewayType };
      })
    }

    default: return state;
  }
}
