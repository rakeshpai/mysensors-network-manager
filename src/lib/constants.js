import nrfImage from '../images/nrf.jpg';
import rfmImage from '../images/rfm.png';

export const radios = [
  {
    name: 'NRF24L01+',
    image: nrfImage,
    pros: 'So so cheap!',
    cons: 'Possible interference and range issues.'
  },
  {
    name: 'RFM69',
    image: rfmImage,
    pros: 'Less interference, better range.',
    cons: 'More expensive compared to the NRF24L01+.'
  }
]
