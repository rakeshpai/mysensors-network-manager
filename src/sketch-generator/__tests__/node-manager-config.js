import { nodeManagerConfiguration } from '../generate-config-h';

const match = expect.stringMatching;

it('sets up the power manager', () => {
  expect(
    nodeManagerConfiguration({
      radio: 'NRF24L01+'
    }, {
      battery: {},
      sensors: [{ usePowerPin: false }]
    })
  ).toEqual(match(/\n#define POWER_MANAGER 0/));

  expect(
    nodeManagerConfiguration({
      radio: 'NRF24L01+'
    }, {
      battery: {},
      sensors: [{ usePowerPin: true }]
    })
  ).toEqual(match(/\n#define POWER_MANAGER 1/));
});

it('sets up the battery manager', () => {
  expect(
    nodeManagerConfiguration({
      radio: 'NRF24L01+'
    }, {
      battery: { powered: false },
      sensors: []
    })
  ).toEqual(match(/\n#define BATTERY_MANAGER 0/));

  expect(
    nodeManagerConfiguration({
      radio: 'NRF24L01+'
    }, {
      battery: { powered: true },
      sensors: []
    })
  ).toEqual(match(/\n#define BATTERY_MANAGER 1/));
});

it('sets up the analog input module', () => {
  ['analogInput', 'ldr', 'thermistor', 'acs712'].forEach(type => {
    expect(
      nodeManagerConfiguration({
        radio: 'NRF24L01+'
      }, {
        battery: { powered: false },
        sensors: [{ type }]
      })
    ).toEqual(match(/\n#define MODULE_ANALOG_INPUT 1/));
  });

  expect(
    nodeManagerConfiguration({
      radio: 'NRF24L01+'
    }, {
      battery: { powered: false },
      sensors: [{ type: 'foo' }]
    })
  ).toEqual(match(/\n#define MODULE_ANALOG_INPUT 0/));
});

it('sets up the digital input module', () => {
  expect(
    nodeManagerConfiguration({
      radio: 'NRF24L01+'
    }, {
      battery: { powered: false },
      sensors: [{ type: 'digitalInput' }]
    })
  ).toEqual(match(/\n#define MODULE_DIGITAL_INPUT 1/));
});

it('sets up the digital output module', () => {
  ['relay', 'latchingRelay', 'digitalOutput'].forEach(type => {
    expect(
      nodeManagerConfiguration({
        radio: 'NRF24L01+'
      }, {
        battery: { powered: false },
        sensors: [{ type }]
      })
    ).toEqual(match(/\n#define MODULE_DIGITAL_OUTPUT 1/));
  });

  expect(
    nodeManagerConfiguration({
      radio: 'NRF24L01+'
    }, {
      battery: { powered: false },
      sensors: [{ type: 'foo' }]
    })
  ).toEqual(match(/\n#define MODULE_DIGITAL_OUTPUT 0/));
});

it('sets up the switch module', () => {
  ['switch', 'door', 'motion'].forEach(type => {
    expect(
      nodeManagerConfiguration({
        radio: 'NRF24L01+'
      }, {
        battery: { powered: false },
        sensors: [{ type }]
      })
    ).toEqual(match(/\n#define MODULE_SWITCH 1/));
  });

  expect(
    nodeManagerConfiguration({
      radio: 'NRF24L01+'
    }, {
      battery: { powered: false },
      sensors: [{ type: 'foo' }]
    })
  ).toEqual(match(/\n#define MODULE_SWITCH 0/));
});
