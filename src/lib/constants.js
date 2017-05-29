import nrfImage from '../images/nrf.jpg';
import rfmImage from '../images/rfm.png';

export const radios = [
  {
    name: 'NRF24L01+',
    image: nrfImage,
    pros: 'So so cheap!',
    cons: 'Possible interference and range issues.',
    frequencies: Array(126).fill(0).map((_, channel) => channel + 2400),
    defaultFrequency: 2477
  },
  {
    name: 'RFM69',
    image: rfmImage,
    pros: 'Less interference, better range.',
    cons: 'More expensive compared to the NRF24L01+.',
    frequencies: [433,868,915],
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
]
