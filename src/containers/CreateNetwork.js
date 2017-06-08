import { connect } from 'react-redux';
import CreateNetwork from '../components/CreateNetwork';
import { generateId } from '../lib/utils';
import { push } from 'react-router-redux';

export default connect(
  s => s,
  dispatch => {
    return {
      createNetwork: net => {
        const network = { ...net, id: generateId(), nodes: [] };
        dispatch({ type: 'CREATE_NETWORK', network })
        dispatch(push(`/networks/${network.id}/gateway`));
      }
    }
  }
)(CreateNetwork);
