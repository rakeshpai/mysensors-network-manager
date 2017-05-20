import { connect } from 'react-redux';
import CreateNetwork from '../components/CreateNetwork';

export default connect(
  s => s,
  dispatch => {
    return {
      onRadioChange: radio => dispatch({ type: 'ON_RADIO_CHANGE', radio }),
      onChannelChange: channel => dispatch({ type: 'ON_CHANNEL_CHANGE', channel }),
      onFrequencyChange: frequency => dispatch({ type: 'ON_FREQUENCY_CHANGE', frequency })
    }
  }
)(CreateNetwork);
