import { connect } from 'react-redux';
import Network from '../components/Network';
import { generateId } from '../lib/utils';
import { push } from 'react-router-redux';

export const deleteNetwork = dispatch => networkId => {
  dispatch({ type: 'DELETE_NETWORK', networkId });
  dispatch(push(`/networks`));
}

export const addNode = dispatch => networkId => {
  const id = generateId();
  dispatch({ type: 'ADD_NODE', networkId, id });
  dispatch(push(`/networks/${networkId}/${id}`))
}

export default connect(
  s => s,
  dispatch => {
    return {
      deleteNetwork: deleteNetwork(dispatch),
      addNode: addNode(dispatch),
      changeRadio: (networkId, radio) => dispatch({ type: 'CHANGE_RADIO', networkId, radio }),
      onNrfChannelChange: (networkId, nrfChannel) => dispatch({ type: 'CHANGE_CHANNEL', networkId, nrfChannel }),
      onRfmFrequencyChange: (networkId, rfmFrequency) => dispatch ({ type: 'CHANGE_FREQUENCY', networkId, rfmFrequency }),
      onHmacChange: (networkId, hmac) => dispatch({ type: 'CHANGE_HMAC', networkId, hmac }),
      onAesChange: (networkId, aes) => dispatch({ type: 'CHANGE_AES', networkId, aes })
    }
  }
)(Network);
