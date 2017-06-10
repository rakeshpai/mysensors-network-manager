import { radioConfiguration } from '../generate-config-h';

const match = expect.stringMatching;

it('enables the NRF radio', () => {
  const output = radioConfiguration({
    radio: 'NRF24L01+',
  }, {
    battery: { powered: false }
  });

  expect(output).toEqual(match(/\n#define MY_RADIO_NRF24/));
  expect(output).toEqual(match(/\n#define MY_RF24_ENABLE_ENCRYPTION/));
});

it('sets the NRF channel', () => {
  const output = radioConfiguration({
    radio: 'NRF24L01+',
    nrfChannel: 75
  }, {
    battery: { powered: false }
  });

  expect(output).toEqual(match(/\n#define MY_RF24_CHANNEL 75/));
})

it('sets the PA level', () => {
  const networkConfig = { radio: 'NRF24L01+' };

  expect(
    radioConfiguration(
      networkConfig,
      { battery: { powered: false }}
    )
  ).toEqual(match(/\n#define MY_RF24_PA_LEVEL RF24_PA_LOW/));

  expect(
    radioConfiguration(
      networkConfig,
      { battery: { powered: true }}
    )
  ).toEqual(match(/\n#define MY_RF24_PA_LEVEL RF24_PA_LOW/));

  expect(
    radioConfiguration(
      networkConfig,
      { battery: { powered: true }, pa: true }
    )
  ).toEqual(match(/\n#define MY_RF24_PA_LEVEL RF24_PA_LOW/));

  expect(
    radioConfiguration(
      networkConfig,
      { battery: { powered: false }, pa: true }
    )
  ).toEqual(match(/\n#define MY_RF24_PA_LEVEL RF24_PA_HIGH/));
});

it('enables the RFM radio', () => {
  const output = radioConfiguration(
    { radio: 'RFM69' },
    {}
  );

  expect(output).toEqual(match(/\n#define MY_RADIO_RFM69/));
  expect(output).toEqual(match(/\n#define MY_RFM69_NEW_DRIVER/));
  expect(output).toEqual(match(/\n#define MY_RFM69_ENABLE_ENCRYPTION/));
});

it('sets the RFM frequency', () => {
  expect(
    radioConfiguration(
      { radio: 'RFM69', rfmFrequency: 868 },
      {}
    )
  ).toEqual(match(/\n#define MY_RFM69_FREQUENCY RF69_868MHZ/));
});

it('configures HW module', () => {
  const networkConfig = { radio: 'RFM69' };

  expect(
    radioConfiguration(
      networkConfig,
      { hw: false }
    )
  ).toEqual(match(/\n\/\/#define MY_IS_RFM69HW/));

  expect(
    radioConfiguration(
      networkConfig,
      { hw: true }
    )
  ).toEqual(match(/\n#define MY_IS_RFM69HW/));
});
