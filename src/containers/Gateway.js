import { connect } from 'react-redux';
import Gateway from '../components/Gateway';

export default connect(
  s => s,
  dispatch => {
    const d = (type, action) => dispatch({ type: `NETWORK/${type}`, ...action});

    return {
      onGatewayTypeChange: (networkId, gatewayType) => d('GATEWAY_TYPE_CHANGE', {networkId, gatewayType})
    }
  }
)(Gateway);
