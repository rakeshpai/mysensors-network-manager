import React from 'react';
import { css } from 'glamor';

export default ({ value, unit, onValueChange, onUnitChange }) => (
  <div>
    <input type='number' value={value}
      min='0' max='32767' className={css({ marginRight: 5 })}
      onChange={onValueChange} />
    <select value={unit} onChange={onUnitChange}>
      {['seconds', 'minutes', 'hours', 'days'].map(u => <option key={u} value={u}>{u}</option>)}
    </select>
  </div>
);
