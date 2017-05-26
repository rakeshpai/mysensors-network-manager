import React from 'react';
import { radios } from '../lib/constants';

import { blockInput } from '../styles/forms';
import { formatNumber } from '../lib/utils';

export default props => {
  const {
    radio, nrfFrequency, rfmFrequency, id,
    onNrfFreqChange, onRfmFreqChange } = props;

  const onFrequencyChange = e => {
    (
      (radio === 'NRF24L01+') ? onNrfFreqChange : onRfmFreqChange
    )(parseInt(e.target.value, 10));
  }

  return (
    <select className={blockInput} id={id}
      value={radio === 'NRF24L01+' ? nrfFrequency : rfmFrequency}
      onChange={onFrequencyChange}>
      {radios.find(r => r.name === radio).frequencies.map(f => (
        <option value={f} key={f}>
          {formatNumber(f)} Mhz
        </option>
      ))}
    </select>
  )
}
