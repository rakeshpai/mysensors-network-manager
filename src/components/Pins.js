import React from 'react';

const analogPins = {
  atmega328: Array(8).fill(0).map((_, i) => `A${i}`),
  esp8266: [ 'A0' ]
}

const digitalPins = {
  atmega328: [ ...analogPins.atmega328, Array(14).fill(0).map((_, i) => `D${i}`) ],
  esp8266: [ 0,1,2,3,4,5,12,13,14,15,16 ].map(i => `D${i}`)
}

const pwmPins = {
  atmega328: [ 3,5,6,10,11 ].map(i => `D${i}`),
  esp8266: [ ...digitalPins.esp8266 ]
}

const Dropdown = ({pinList, ...props}) => (
  <select {...props}>
    {pinList.map(p => <option value={p} key={p}>{p}</option>)}
  </select>
);

export const AnalogPins = ({ chip = 'atmega328', ...props }) => <Dropdown pinList={analogPins[chip]} {...props} />;
export const DigitalPins = ({ chip = 'atmega328', ...props }) => <Dropdown pinList={digitalPins[chip]} {...props} />;
export const PWMPins = ({ chip = 'atmega328', ...props }) => <Dropdown pinList={pwmPins[chip]} {...props} />;
