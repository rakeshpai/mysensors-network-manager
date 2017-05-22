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
]
