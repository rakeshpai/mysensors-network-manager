import React from 'react';
import { chips } from '../lib/constants';

const Dropdown = ({pinList, ...props}) => (
  <select {...props}>
    {pinList.map(p => <option value={p} key={p}>{p}</option>)}
  </select>
);

export const AnalogPins = ({ chip = 'atmega328', ...props }) => <Dropdown pinList={chips[chip].pins.analog} {...props} />;
export const DigitalPins = ({ chip = 'atmega328', ...props }) => <Dropdown pinList={chips[chip].pins.digital} {...props} />;
export const PWMPins = ({ chip = 'atmega328', ...props }) => <Dropdown pinList={chips[chip].pins.pwm} {...props} />;
export const InterruptPins = ({ chip = 'atmega328', ...props }) => <Dropdown pinList={chips[chip].pins.interrupt} {...props} />;
