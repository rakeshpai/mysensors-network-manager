import sensorLines, { getVariableSuffix } from '../sensor-lines';

const match = expect.stringMatching;

it('sets the correct variable suffix', () => {
  const ldr1 = {type: 'ldr'};
  const ldr2 = {type: 'ldr'};

  expect(getVariableSuffix(ldr1, [ldr1])).toEqual('');
  expect(getVariableSuffix(ldr1, [ldr1, ldr2])).toEqual('1');
  expect(getVariableSuffix(ldr2, [ldr1, ldr2])).toEqual('2');
});

it('sets up the sensor\'s variable', () => {
  const output = sensorLines({
    nodes: [{
      id: 'asdf',
      sensors: [{
        type: 'ldr',
        pin: 'A0'
      }]
    }]
  }, 'asdf').join('\n');

  expect(output).toEqual(match(/\nint ldr = nm.registerSensor\(SENSOR_LDR, A0\);/));
  expect(output).toEqual(match(/\nSensorLDR\* ldrSensor = \(\(SensorLDR\*\)nm.getSensor\(ldr\)\);/));
});

it('sets up the sensor\'s percentage range', () => {
  const output = sensorLines({
    nodes: [{
      id: 'asdf',
      sensors: [{
        type: 'ldr',
        pin: 'A0',
        reportPercentage: true,
        percentageRangeMin: 333,
        percentageRangeMax: 999
      }]
    }]
  }, 'asdf').join('\n');

  expect(output).toEqual(match(/\nldrSensor->setRangeMin\(333\);/));
  expect(output).toEqual(match(/\nldrSensor->setRangeMax\(999\);/));
});

it('sets up the extra params for the rain sensor', () => {
  const output = sensorLines({
    nodes: [{
      id: 'asdf',
      sensors: [{
        type: 'rain',
        pin: 'A0'
      }]
    }]
  }, 'asdf').join('\n');

  expect(output).toEqual(match(/\nrainSensor->setPresentation\(S_RAIN\);/));
  expect(output).toEqual(match(/\nrainSensor->setType\(V_RAINRATE\);/));
});
