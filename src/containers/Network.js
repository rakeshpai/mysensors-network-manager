import { connect } from 'react-redux';
import Network from '../components/Network';
import { push } from 'react-router-redux';

export default connect(
  s => s,
  dispatch => {
    return {
      deleteNetwork: networkId => {
        dispatch({ type: 'DELETE_NETWORK', networkId })
        dispatch(push(`/networks`));
      },
      changeRadio: (networkId, radio) => dispatch({ type: 'CHANGE_RADIO', networkId, radio }),
      onFrequencyChange: (networkId, frequency) => dispatch ({ type: 'CHANGE_FREQUENCY', networkId, frequency }),
    }
  }
)(Network);
