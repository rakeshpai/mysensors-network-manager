import { sensors } from '../lib/constants';

export default (node, sensor, variableSuffix) => {
  const matchingSensor = sensors.find(s => s.type === sensor.type);

  const sensorHandle = sensor.type + variableSuffix;
  const sensorVariable = `${sensor.type}Sensor${variableSuffix}`;

  const lines = [
    `// Code for ${matchingSensor.label}`,
    `int ${sensorHandle} = nm.registerSensor(SENSOR_${matchingSensor.nmType}, ${sensor.pin.replace(/^[D]/gi, '')});`,
    `${matchingSensor.nmClass}* ${sensorVariable} = ((${matchingSensor.nmClass}*)nm.getSensor(${sensorHandle}));`,
  ];

  if(sensor.usePowerPin) lines.push(`${sensorVariable}->setPowerPins(${sensor.powerPin.replace(/^[D]/gi, '')},12,300);`);

  if('reportPercentage' in sensor) {
    lines.push(`${sensorVariable}->setOutputPercentage(${sensor.reportPercentage?'true':'false'});`);

    if(sensor.reportPercentage) {
      lines.push(`${sensorVariable}->setRangeMin(${sensor.percentageRangeMin});`);
      lines.push(`${sensorVariable}->setRangeMax(${sensor.percentageRangeMin});`);
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
  if('normalValue' in sensor) lines.push(`${sensorVariable}->setIntial(${sensor.normalValue});`);

  lines.push('');

  return lines;
}
