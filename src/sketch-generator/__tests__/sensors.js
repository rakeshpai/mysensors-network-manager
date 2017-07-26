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

it('sets up the sensor\'s reporting interval', () => {
  const output = sensorLines({
    nodes: [{
      id: 'asdf',
      sensors: [{
        type: 'ldr',
        pin: 'A0',
        reportInterval: 42,
        reportIntervalUnit: 'seconds'
      }]
    }]
  }, 'asdf').join('\n');

  expect(output).toEqual(match(/\nldrSensor->setReportIntervalSeconds\(42\);/));
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

it('sets up mVPerAmp for the acs712', () => {
  const output = sensorLines({
    nodes: [{
      id: 'asdf',
      sensors: [{
        type: 'acs712',
        pin: 'A0',
        mvPerAmp: '0.03'
      }]
    }]
  }, 'asdf').join('\n');

  expect(output).toEqual(match(/\nacs712Sensor->setmVPerAmp\(0\.03\);/));
});

it('sets the initial value, \'on\' value for digital output sensors', () => {
  const output = sensorLines({
    nodes: [{
      id: 'asdf',
      sensors: [{
        type: 'relay',
        pin: 'D0',
        initialValue: 'low',
        onValue: 'high'
      }]
    }]
  }, 'asdf').join('\n');

  expect(output).toEqual(match(/\nrelaySensor->setInitialValue\(LOW\);/));
  expect(output).toEqual(match(/\nrelaySensor->setOnValue\(HIGH\);/));
});

it('sets up auto-turn-off for digital-out', () => {
  const output = sensorLines({
    nodes: [{
      id: 'asdf',
      sensors: [{
        type: 'relay',
        pin: 'D0',
        autoTurnOff: true,
        turnOffTime: 2
      }]
    }]
  }, 'asdf').join('\n');

  expect(output).toEqual(match(/\nrelaySensor->setSafeguard\(2\);/));
});

it('sets up interrupts', () => {
  const output = sensorLines({
    nodes: [{
      id: 'asdf',
      sensors: [{
        type: 'motion',
        pin: 'D1',
        interruptMode: 'change'
      }]
    }]
  }, 'asdf').join('\n');

  expect(output).toEqual(match(/\nmotionSensor->setMode\(CHANGE\);/));
});

it('sets up debounce for digital-in', () => {
  const output = sensorLines({
    nodes: [{
      id: 'asdf',
      sensors: [{
        type: 'door',
        pin: 'D0',
        debounceTime: 50
      }]
    }]
  }, 'asdf').join('\n');

  expect(output).toEqual(match(/\ndoorSensor->setDebounce\(50\);/));
});

it('sets up the \'normal\' state of a digital-in', () => {
  const output = sensorLines({
    nodes: [{
      id: 'asdf',
      sensors: [{
        type: 'door',
        pin: 'D0',
        normalValue: 'high'
      }]
    }]
  }, 'asdf').join('\n');

  expect(output).toEqual(match(/\ndoorSensor->setInitial\(HIGH\);/));
});
