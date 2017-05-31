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
      onNrfChannelChange: (networkId, nrfChannel) => dispatch({ type: 'CHANGE_CHANNEL', networkId, nrfChannel }),
      onRfmFrequencyChange: (networkId, rfmFrequency) => dispatch ({ type: 'CHANGE_FREQUENCY', networkId, rfmFrequency }),
      onHmacChange: (networkId, hmac) => dispatch({ type: 'CHANGE_HMAC', networkId, hmac }),
      onAesChange: (networkId, aes) => dispatch({ type: 'CHANGE_AES', networkId, aes })
    }
  }
)(Network);
