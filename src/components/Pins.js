import React from 'react';
import { analogPins, digitalPins, pwmPins, interruptPins } from '../lib/constants';

const Dropdown = ({pinList, ...props}) => (
  <select {...props}>
    {pinList.map(p => <option value={p} key={p}>{p}</option>)}
  </select>
);

export const AnalogPins = ({ chip = 'atmega328', ...props }) => <Dropdown pinList={analogPins[chip]} {...props} />;
export const DigitalPins = ({ chip = 'atmega328', ...props }) => <Dropdown pinList={digitalPins[chip]} {...props} />;
export const PWMPins = ({ chip = 'atmega328', ...props }) => <Dropdown pinList={pwmPins[chip]} {...props} />;
export const InterruptPins = ({ chip = 'atmega328', ...props }) => <Dropdown pinList={interruptPins[chip]} {...props} />;
