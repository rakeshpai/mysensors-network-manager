import nrfImage from '../images/nrf.jpg';
import rfmImage from '../images/rfm.png';

export const radios = [
  {
    name: 'NRF24L01+',
    image: nrfImage,
    pros: 'Cheap! No external antenna needed.',
    cons: 'Possible interference and range issues.',
    frequencies: Array(125).fill(0).map((_, channel) => ({
      value: channel,
      display: `2.${(400 + channel).toString().replace(/0+$/,'')} GHz (ch: ${channel + 1})`
    })),
    defaultChannel: 76
  },
  {
    name: 'RFM69',
    image: rfmImage,
    pros: 'Less interference, better range.',
    cons: 'More expensive. Needs an external antenna.',
    frequencies: [433,868,915].map(f => ({ value: f, display: `${f} MHz` })),
    defaultFrequency: 868
  }
];

export const gatewayTypes = [
  {
    name: 'serial',
    title: 'Serial gateway',
    description: 'The gateway is directly connected to a computer\'s serial port, usually through a USB cable.'
  },
  {
    name: 'ethernet',
    title: 'Ethernet based gateway',
    description: 'The gateway is connected to your ethernet network using an ethernet cable'
  },
  {
    name: 'esp8266',
    title: 'ESP8266 WiFi based gateway',
    description: 'The gateway is connected to your ethernet network using the ESP8266 module'
  }
];

export const spFiles = ([
  { key: 'sp-ino', name: 'SecurityPersonalizer.ino' },
  { key: 'src-h', name: 'sha204_lib_return_codes.h' },
  { key: 'sl-c', name: 'sha204_library.cpp' },
  { key: 'sl-h', name: 'sha204_library.h' }
]).map(f => ({ ...f, path: 'https://raw.githubusercontent.com/mysensors/MySensors/development/examples/SecurityPersonalizer/'}));

export const nmFiles = ([
  { key: 'nm-c', name: 'NodeManager.cpp' },
  { key: 'nm-h', name: 'NodeManager.h' }
]).map(f => ({ ...f, path: 'https://raw.githubusercontent.com/mysensors/NodeManager/master/' }));

export const analogPins = {
  atmega328: Array(8).fill(0).map((_, i) => `A${i}`),
  esp8266: [ 'A0' ]
}

export const digitalPins = {
  atmega328: [ ...Array(14).fill(0).map((_, i) => `D${i}`), ...analogPins.atmega328 ],
  esp8266: [ 0,1,2,3,4,5,12,13,14,15,16 ].map(i => `D${i}`)
}

export const pwmPins = {
  atmega328: [ 3,5,6,10,11 ].map(i => `D${i}`),
  esp8266: [ ...digitalPins.esp8266 ]
}

export const sensors = [
  { pinType: 'analog', type: 'ldr', label: 'Light dependent resistor (LDR)', defaults: { usePowerPin: true, reportPercentage: true, setReverse: true }},
  { pinType: 'analog', type: 'rain', label: 'Rain sensor', defaults: { usePowerPin: true, reportPercentage: true, setReverse: true }},
  { pinType: 'analog', type: 'soil', label: 'Soil Moisture sensor', defaults: { usePowerPin: true, reportPercentage: true, setReverse: true }},
  //{ pinType: 'analog', type: 'thermistor', label: 'Thermistor', defaults: { usePowerPin: true }},
  { pinType: 'analog', type: 'acs712', label: 'ACS712 current sensor', defaults: { usePowerPin: true }},
  //{ pinType: 'analog', type: 'rainGuage', label: 'Rain Guage', defaults: { usePowerPin: true }},
  { pinType: 'analog', type: 'analogInput', label: 'Generic analog input', defaults: { usePowerPin: true, reportPercentage: true, setReverse: true }},
  { pinType: 'digital', type: 'relay', label: 'Relay' },
  { pinType: 'digital', type: 'latchingRelay', label: 'Latching relay' },
  { pinType: 'digital', type: 'switch', label: 'Switch' },
  { pinType: 'digital', type: 'door', label: 'Door' },
  { pinType: 'digital', type: 'motion', label: 'PIR Motion sensor' },
  { pinType: 'digital', type: 'hcsr504', label: 'HC-SR504 Ultrasonic range finder' },
  { pinType: 'digital', type: 'digitalOutput', label: 'Generic digital output'  }
]
