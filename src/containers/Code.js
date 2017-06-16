import { connect } from 'react-redux';
import Code from '../components/Code';
import { createHandlers } from './Node';

export default connect(
  s => s,
  dispatch => ({ createHandlers: createHandlers(dispatch) })
)(Code);
