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
    setVoltsPerBit: voltsPerBit => d('SET_BATTERY_VPB', { voltsPerBit }),

    setSleepTime: sleepTime => d('SET_SLEEP_TIME', { sleepTime }),
    setSleepUnit: sleepUnit => d('SET_SLEEP_UNIT', { sleepUnit }),

    addSensor: sensor => d('ADD_SENSOR', { sensor }),
    deleteSensor: index => d('DELETE_SENSOR', { index }),

    sensorHandlers: sensorIndex => {
      const ds = (type, action) => d(type, { sensorIndex, ...action });

      return {
        setPin: pin => ds('SET_SENSOR_PIN', { pin }),
        usePowerPin: use => ds('SET_SENSOR_USE_POWER_PIN', { use }),
        setPowerPin: pin => ds('SET_SENSOR_POWER_PIN', { pin }),
        setReportPercentage: percent => ds('SET_SENSOR_REPORT_PERCENTAGE', { percent }),
        setPercentageMin: min => ds('SET_SENSOR_PERCENTAGE_MIN', { min }),
        setPercentageMax: max => ds('SET_SENSOR_PERCENTAGE_MAX', { max }),
        setMvPerAmp: mvPerAmp => ds('SET_SENSOR_MV_PER_AMP', { mvPerAmp })
      }
    }
  }
};

export default connect(
  s => s,
  dispatch => ({ createHandlers: createHandlers(dispatch) })
)(Node);
