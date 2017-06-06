import React from 'react';
import { sensors } from '../lib/constants';

const Option = ({type, label}) => <option key={type} value={type}>{label}</option>

export default ({dropdownRef, ...props}) => (
  <select ref={dropdownRef} {...props}>
    <optgroup label='Analog sensors'>
      {
        sensors
        .filter(({ pinType}) => pinType === 'analog')
        .map(Option)
      }
    </optgroup>
    <optgroup label='Digital sensors'>
      {
        sensors
        .filter(({ pinType }) => pinType === 'digital')
        .map(Option)
      }
    </optgroup>
  </select>
);
