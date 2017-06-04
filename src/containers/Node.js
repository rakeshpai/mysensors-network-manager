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
    setName: name => d('SET_NAME', { name }),
    setDeviceKey: key => d('SET_DEVICE_KEY', { key }),
    setPA: pa => d('SET_PA', { pa }),
    setHW: hw => d('SET_HW', { hw }),
    setBatteryPowered: b => d('SET_BATTERY_POWERED', { batteryPowered: b }),
    setBatteryMin: min => d('SET_BATTERY_MIN', { min }),
    setBatteryMax: max => d('SET_BATTERY_MAX', { max }),
    setMeasure: measure => d('SET_BATTERY_MEASURE', { measure }),
    setMeasurePin: measurePin => d('SET_BATTERY_MEASURE_PIN', { measurePin }),
    setVoltsPerBit: voltsPerBit => d('SET_BATTERY_VPB', { voltsPerBit })
  }
};

export default connect(
  s => s,
  dispatch => ({ createHandlers: createHandlers(dispatch) })
)(Node);
