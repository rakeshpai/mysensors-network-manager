import React from 'react';
import { radios } from '../lib/constants';

export default props => {
  const {
    radio, nrfChannel, rfmFrequency, id,
    onNrfChannelChange, onRfmFrequencyChange } = props;

  const onFrequencyChange = e => {
    (
      (radio === 'NRF24L01+') ? onNrfChannelChange : onRfmFrequencyChange
    )(parseInt(e.target.value, 10));
  }

  return (
    <select id={id}
      value={radio === 'NRF24L01+' ? nrfChannel : rfmFrequency}
      onChange={onFrequencyChange}>
      {radios.find(r => r.name === radio).frequencies.map(({ value, display }) => (
        <option value={value} key={value}>
          {display}
        </option>
      ))}
    </select>
  )
}
