import { generateSketch } from '../node-sketch-files';

const match = expect.stringMatching;

it('sets up software signing', () => {
  const output = generateSketch({
    network: {
      radio: 'NRF24L01+',
      nodes: [{
        id: 'asdf',
        battery: {},
        signing: 'software',
        softSigningPin: 'A7',
        sensors: []
      }]
    },
    nodeId: 'asdf'
  });

  expect(output).toEqual(match(/\n#define MY_SIGNING_SOFT/));
  expect(output).toEqual(match(/\n#define MY_SIGNING_SOFT_RANDOMSEED_PIN 7/));
  expect(output).toEqual(match(/\n#define MY_SIGNING_REQUEST_SIGNATURES/));
});

it('sets up ATSHA signing', () => {
  const output = generateSketch({
    network: {
      radio: 'NRF24L01+',
      nodes: [{
        id: 'asdf',
        battery: {},
        signing: 'atsha',
        atshaSigningPin: 'A3',
        sensors: []
      }]
    },
    nodeId: 'asdf'
  });

  expect(output).toEqual(match(/\n#define MY_SIGNING_ATSHA204/));
  expect(output).toEqual(match(/\n#define MY_SIGNING_ATSHA204_PIN 3/));
  expect(output).toEqual(match(/\n#define MY_SIGNING_REQUEST_SIGNATURES/));
});

it('doesn\'t include battery and sleep when not required', () => {
  const output = generateSketch({
    network: {
      radio: 'NRF24L01+',
      nodes: [{
        id: 'asdf',
        battery: {},
        signing: 'software',
        softSigningPin: 'A7',
        sensors: []
      }]
    },
    nodeId: 'asdf'
  })

  expect(output).not.toEqual(match(/\n\s*nm.setBattery/));
  expect(output).not.toEqual(match(/\n\s*nm.setSleep/));
});

it('sets battery min/max', () => {
  const output = generateSketch({
    network: {
      radio: 'NRF24L01+',
      nodes: [{
        id: 'asdf',
        battery: {
          powered: true,
          min: 1.8,
          max: 3.2
        },
        sleepUnit: 'minutes',
        signing: 'software',
        softSigningPin: 'A7',
        sensors: []
      }]
    },
    nodeId: 'asdf'
  });

  expect(output).toEqual(match(/\n\s*nm\.setBatteryMin\(1\.8\);/));
  expect(output).toEqual(match(/\n\s*nm\.setBatteryMax\(3\.2\);/));
});

it('sets up external battery measurement', () => {
  const output = generateSketch({
    network: {
      radio: 'NRF24L01+',
      nodes: [{
        id: 'asdf',
        battery: {
          powered: true,
          min: 1.8,
          max: 3.2,
          measure: 'external',
          measurePin: 'A0',
          voltsPerBit: 0.01
        },
        sleepUnit: 'minutes',
        signing: 'software',
        softSigningPin: 'A7',
        sensors: []
      }]
    },
    nodeId: 'asdf'
  });

  expect(output).toEqual(match(/\n\s*nm\.setBatteryInternalVcc\(false\);/));
  expect(output).toEqual(match(/\n\s*nm\.setBatteryPin\(A0\);/));
  expect(output).toEqual(match(/\n\s*nm\.setBatteryVoltsPerBit\(0\.01\);/));
});

it('sets up sleep', () => {
  const output = generateSketch({
    network: {
      radio: 'NRF24L01+',
      nodes: [{
        id: 'asdf',
        battery: {
          powered: true
        },
        sleepTime: 42,
        sleepUnit: 'minutes',
        signing: 'software',
        softSigningPin: 'A7',
        sensors: []
      }]
    },
    nodeId: 'asdf'
  });

  expect(output).toEqual(match(/\n\s*nm\.setSleep\(1, 42, MINUTES\);/));
});
