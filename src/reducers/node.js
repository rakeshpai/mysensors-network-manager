import { sensors, analogPins, digitalPins } from '../lib/constants';

const getNextAvailablePin = (type, node) => {
  const pinType = sensors.find(s => s.type === type).pinType;
  const chip = (node.type === 'gateway' && node.gatewayType === 'esp8266') ? 'esp8266' : 'atmega328';
  const usedPins = node.sensors.map(s => s.pin);

  return (pinType === 'analog' ? analogPins : digitalPins)[chip].find(p => !usedPins.includes(p));
}

const getPowerPin = (type, node) => {
  const chip = (node.type === 'gateway' && node.gatewayType === 'esp8266') ? 'esp8266' : 'atmega328';
  const usedPowerPins = node.sensors.map(s => s.powerPin).filter((v, i, o) => o.indexOf(v) === i);
  if(usedPowerPins.length) return usedPowerPins[0];

  const usedPins = node.sensors.map(s => s.pin);
  return digitalPins[chip].find(p => !usedPins.includes(p));
}

const defaultSensorValues = (sensorType, node) => {
  const defaults = {
    type: sensorType,
    pin: getNextAvailablePin(sensorType, node),
    ...sensors.find(s => s.type === sensorType).defaults
  };

  if(defaults.usePowerPin) defaults.powerPin = getPowerPin(sensorType, node);
  if(defaults.reportPercentage) {
    defaults.percentageRangeMin = 0;
    defaults.percentageRangeMax = 1024;
  }

  if(sensorType === 'acs712') defaults.mvPerAmp = 185;

  return defaults;
}

export default (state, action) => {
  const m = modified => ({ ...state, ...modified });
  const mb = modified => ({ ...state, battery: { ...state.battery, ...modified }});
  const ms = modified => ({ ...state, sensors: [
    ...state.sensors.map(sensor => {
      if(sensor.id === action.sensorIndex) return sensor;
      return { ...sensor, ...modified };
    })
  ]})

  switch(action.type.slice(('NODE/').length)) {
    case 'SET_NAME': return m({ name: action.name });
    case 'SET_DEVICE_KEY': return m({ key: action.key });
    case 'SET_PA': return m({ pa: action.pa });
    case 'SET_HW': return m({ hw: action.hw });

    case 'SET_BATTERY_POWERED': return mb({ powered: action.batteryPowered });
    case 'SET_BATTERY_MIN': return mb({ min: action.min });
    case 'SET_BATTERY_MAX': return mb({ max: action.max });
    case 'SET_BATTERY_MEASURE': return mb({ measure: action.measure });
    case 'SET_BATTERY_MEASURE_PIN': return mb({ measurePin: action.measurePin });
    case 'SET_BATTERY_VPB': return mb({ voltsPerBit: action.voltsPerBit });

    case 'SET_SLEEP_TIME': return m({ sleepTime: action.sleepTime });
    case 'SET_SLEEP_UNIT': return m({ sleepUnit: action.sleepUnit });

    case 'ADD_SENSOR': return { ...state, sensors: [ ...state.sensors, defaultSensorValues(action.sensor, state) ]};
    case 'DELETE_SENSOR': return { ...state, sensors: [
      ...state.sensors.slice(0, action.index),
      ...state.sensors.slice(action.index + 1)
    ]};

    case 'SET_SENSOR_PIN': return ms({ pin: action.pin });
    case 'SET_SENSOR_USE_POWER_PIN': return ms({ usePowerPin: action.use });
    case 'SET_SENSOR_POWER_PIN': return ms({ powerPin: action.pin });
    case 'SET_SENSOR_REPORT_PERCENTAGE': return ms({ reportPercentage: action.percent });
    case 'SET_SENSOR_PERCENTAGE_MIN': return ms({ percentageRangeMin: action.min });
    case 'SET_SENSOR_PERCENTAGE_MAX': return ms({ percentageRangeMax: action.max });
    case 'SET_SENSOR_MV_PER_AMP': return ms({ mvPerAmp: action.mvPerAmp});
    default: return state;
  }
}
