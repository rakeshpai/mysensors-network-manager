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
};

export const digitalPins = {
  atmega328: [ ...Array(14).fill(0).map((_, i) => `D${i}`), ...analogPins.atmega328 ],
  esp8266: [ 0,1,2,3,4,5,12,13,14,15,16 ].map(i => `D${i}`)
};

export const pwmPins = {
  atmega328: [ 3,5,6,10,11 ].map(i => `D${i}`),
  esp8266: [ ...digitalPins.esp8266 ]
};

export const interruptPins = {
  atmega328: [ 'D2', 'D3' ],
  esp8266: [ ...digitalPins.esp8266.filter(p => p !== 'D16') ]
};

export const sensors = [
  {
    label: 'Light dependent resistor (LDR)',
    pinType: 'analog',
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
    pinType: 'digital',
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
    pinType: 'digital',
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
    pinType: 'digital',
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
