import { sensorsByType } from '../lib/constants';

export const getVariableSuffix = (sensor, sensors) => {
  const sensorsOfThisType = sensors.filter(s => s.type === sensor.type);

  if(sensorsOfThisType.length === 1) return '';
  return '' + (sensorsOfThisType.findIndex(s => s === sensor) + 1);
}

const sensorLines = (node, sensor, variableSuffix) => {
  const matchingSensor = sensorsByType[sensor.type];

  const sensorHandle = sensor.type + variableSuffix;
  const sensorVariable = `${sensor.type}Sensor${variableSuffix}`;

  const lines = [
    `// Code for ${matchingSensor.label}`,
    `int ${sensorHandle} = nm.registerSensor(SENSOR_${matchingSensor.nmType}, ${sensor.pin.replace(/^[D]/, '')});`,
    `${matchingSensor.nmClass}* ${sensorVariable} = ((${matchingSensor.nmClass}*)nm.getSensor(${sensorHandle}));`,
  ];

  if(sensor.usePowerPin) lines.push(`${sensorVariable}->setPowerPins(${sensor.powerPin.replace(/^[D]/, '')}, 12, 300);`);

  if('reportPercentage' in sensor) {
    lines.push(`${sensorVariable}->setOutputPercentage(${sensor.reportPercentage?'true':'false'});`);

    if(sensor.reportPercentage) {
      lines.push(`${sensorVariable}->setRangeMin(${sensor.percentageRangeMin});`);
      lines.push(`${sensorVariable}->setRangeMax(${sensor.percentageRangeMax});`);
    }
  }

  if(sensor.type === 'rain') {
    lines.push(`${sensorVariable}->setPresentation(S_RAIN);`);
    lines.push(`${sensorVariable}->setType(V_RAINRATE);`);
  }

  if('mvPerAmp' in sensor) lines.push(`${sensorVariable}->setmVPerAmp(${sensor.mvPerAmp});`);
  if('initialValue' in sensor) lines.push(`${sensorVariable}->setInitialValue(${sensor.initialValue.toUpperCase()});`);
  if('onValue' in sensor) lines.push(`${sensorVariable}->setOnValue(${sensor.onValue.toUpperCase()});`);
  if(sensor.autoTurnOff) lines.push(`${sensorVariable}->setSafeguard(${sensor.turnOffTime});`);

  if('interruptMode' in sensor) lines.push(`${sensorVariable}->setMode(${sensor.interruptMode.toUpperCase()});`);
  if('debounceTime' in sensor) lines.push(`${sensorVariable}->setDebounce(${sensor.debounceTime});`);
  if('normalValue' in sensor) lines.push(`${sensorVariable}->setInitial(${sensor.normalValue.toUpperCase()});`);

  lines.push('');

  return lines;
}

export default (network, nodeId) => {
  const node = network.nodes.find(n => n.id === nodeId);

  return node.sensors.reduce((lines, sensor) => {
    return [
      ...lines,
      ...sensorLines(node, sensor, getVariableSuffix(sensor, node.sensors))
    ];
  }, []);
}
