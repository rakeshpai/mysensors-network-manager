import nrfImage from '../images/nrf.jpg';
import rfmImage from '../images/rfm.png';

export const radios = [
  {
    name: 'NRF24L01+',
    image: nrfImage,
    pros: 'Cheap! Built in antenna.',
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
    pros: 'Better range. Lesser possibility of interference.',
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

export const chips = {
  atmega328: {
    platform: 'atmelavr',
    pins: {
      analog: Array(8).fill(0).map((_, i) => `A${i}`),
      digital: [
        ...Array(14).fill(0).map((_, i) => `D${i}`),
        ...Array(8).fill(0).map((_, i) => `A${i}`)  // all analog pins
      ],
      pwm: [ 3,5,6,10,11 ].map(i => `D${i}`),
      interrupt: [ 'D2', 'D3' ]
    }
  },
  esp8266: {
    platform: 'espressif8266',
    pins: {
      analog: [ 'A0' ],
      digital: [ 0,1,2,3,4,5,12,13,14,15,16 ].map(i => `D${i}`),
      pwm: [ 0,1,2,3,4,5,12,13,14,15,16 ].map(i => `D${i}`),  // all digital pins
      interrupt: [ 0,1,2,3,4,5,12,13,14,15 ].map(i => `D${i}`) // all except D16
    }
  }
}

export const boards = [
  {
    id: 'pro8MHzatmega328',
    name: 'Arduino Pro Mini 3.3v',
    chip: 'atmega328'
  },
  {
    id: 'pro16MHzatmega328',
    name: 'Arduino Pro Mini 5v',
    chip: 'atmega328'
  },
  {
    id: 'nanoatmega328',
    name: 'Arduino Nano',
    chip: 'atmega328'
  },
  {
    id: 'uno',
    name: 'Arduino Uno',
    chip: 'atmega328'
  },
  {
    id: 'nodemcuv2',
    name: 'NodeMCU 1.0 (ESP-12E Module)',
    chip: 'esp8266'
  },
  {
    id: 'd1_mini',
    name: 'Wemos D1 mini',
    chip: 'esp8266'
  }
];

export const boardsById = boards.reduce((acc, board) => ({ ...acc, [board.id]: board }), {});

export const sensors = [
  {
    label: 'Light dependent resistor (LDR)',
    pinType: 'analog',
    needsPolling: true,
    type: 'ldr',
    nmType: 'LDR',
    nmClass: 'SensorLDR',
    defaults: {
      usePowerPin: true,
      reportPercentage: true,
      reverse: true
    }
  },
  {
    label: 'Rain sensor',
    pinType: 'analog',
    needsPolling: true,
    type: 'rain',
    nmType: 'RAIN',
    nmClass: 'SensorRain',
    defaults: {
      usePowerPin: true,
      reportPercentage: true,
      reverse: true
    }
  },
  {
    label: 'Soil Moisture sensor',
    pinType: 'analog',
    needsPolling: true,
    type: 'soil',
    nmType: 'SOIL_MOISTURE',
    nmClass: 'SensorSoilMoisture',
    defaults: {
      usePowerPin: true,
      reportPercentage: true,
      reverse: true
    }
  },
  // {
  //   label: 'Thermistor',
  //   pinType: 'analog',
  //   needsPolling: true,
  //   type: 'thermistor',
  //   nmType: 'THERMISTOR',
  //   nmClass: 'SensorThermistor',
  //   defaults: {
  //     usePowerPin: true
  //   }
  // },
  {
    label: 'ACS712 current sensor',
    pinType: 'analog',
    needsPolling: true,
    type: 'acs712',
    nmType: 'ACS712',
    nmClass: 'SensorACS712',
    defaults: {
      usePowerPin: true
    }
  },
  // {
  //   label: 'Rain Guage',
  //   pinType: 'analog',
  //   needsPolling: true,
  //   type: 'rainGuage',
  //   nmType: 'RAIN_GUAGE',
  //   nmClass: 'SensorRainGuage',
  //   defaults: {
  //     usePowerPin: true
  //   }
  // },
  {
    label: 'Generic analog input',
    pinType: 'analog',
    needsPolling: true,
    type: 'analogInput',
    nmType: 'ANALOG_INPUT',
    nmClass: 'SensorAnalogInput',
    defaults: {
      usePowerPin: true,
      reportPercentage: true,
      reverse: true
    }
  },
  {
    label: 'Relay',
    pinType: 'digital',
    type: 'relay',
    nmType: 'RELAY',
    nmClass: 'SensorRelay',
    defaults: {
      onValue: 'high',
      initialValue: 'low',
      autoTurnOff: false,
      turnOffTime: 1,
    }
  },
  {
    label: 'Latching relay',
    pinType: 'digital',
    type: 'latchingRelay',
    nmType: 'LATCHING_RELAY',
    nmClass: 'SensorLatchingRelay',
    defaults: {
      onValue: 'high',
      initialValue: 'low',
      autoTurnOff: false,
      turnOffTime: 1,
      pulseOutput: false,
      pulseDuration: 100
    }
  },
  {
    label: 'Switch',
    pinType: 'interrupt',
    type: 'inputSwitch',
    nmType: 'SWITCH',
    nmClass: 'SensorSwitch',
    defaults: {
      interruptMode: 'change',
      debounceTime: 30,
      normalValue: 'high'
    }
  },
  {
    label: 'Door',
    pinType: 'interrupt',
    type: 'door',
    nmType: 'DOOR',
    nmClass: 'SensorDoor',
    defaults: {
      interruptMode: 'change',
      debounceTime: 30,
      normalValue: 'high'
    }
  },
  {
    label: 'PIR Motion sensor',
    pinType: 'interrupt',
    type: 'motion',
    nmType: 'MOTION',
    nmClass: 'SensorMotion',
    defaults: {
      interruptMode: 'change'
    }
  },
  {
    label: 'HC-SR504 Ultrasonic range finder',
    pinType: 'digital',
    type: 'hcsr504',
    nmType: 'HCSR504',
    nmClass: 'SensorHCSR504',
    defaults: {
      maxDistance: 300
    }
  },
  {
    label: 'Generic digital output',
    pinType: 'digital',
    type: 'digitalOutput',
    nmType: 'DIGITAL_OUTPUT',
    nmClass: 'SensorDigitalOutput',
    defaults: {
      onValue: 'high',
      initialValue: 'low',
      autoTurnOff: false,
      turnOffTime: 1,
      pulseOutput: false,
      pulseDuration: 100
    }
  }
];

export const sensorsByType = sensors.reduce((acc, sensor) => ({ ...acc, [sensor.type]: sensor }), {});
