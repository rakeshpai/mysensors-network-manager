import { connect } from 'react-redux';
import Node from '../components/Node';

export const createHandlers = dispatch => (networkId, nodeId) => {
  const d = (type, action) => dispatch({
    type: `NODE/${type}`,
    networkId,
    nodeId,
    ...action
  });

  return {
    setDeviceKey: key => d('SET_DEVICE_KEY', { key })
  }
};

export default connect(
  s => s,
  dispatch => ({ createHandlers: createHandlers(dispatch) })
)(Node);
