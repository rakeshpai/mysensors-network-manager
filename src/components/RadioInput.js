import React from 'react';
import { css } from 'glamor';

import { outlineStyle } from '../styles/forms';
import { success } from '../styles/colors';

import { generateId } from '../lib/utils';

import Check from './Check';

const styles = {
  hiddenRadio: css({
    marginLeft: '-2em',
    opacity: 0,
    position: 'absolute',

    '&:checked + label': {
      borderColor: success,
      opacity: 1
    },

    '&:focus + label': { ...outlineStyle }
  }),
  labelStyles: {
    display: 'block',
    borderRadius: 5,
    cursor: 'pointer',
    border: '1px solid #ddd',
    transition: 'all 0.3s ease-in',
    opacity: 0.8,

    '&:hover': {
      borderColor: '#aaa',
      opacity: 0.9
    }
  }
}

export default ({ name, value, checked, onChange, checkClassName, className, children}) => {
  const id = generateId();

  return (
    <div>
      <input type='radio' name={name} value={value}
        onChange={onChange} checked={checked} id={id}
        className={styles.hiddenRadio} />

      <label className={css(styles.labelStyles, className)} htmlFor={id}>
        {checked && (
          <span className={checkClassName}>
            <Check />
          </span>
        )}
        {children}
      </label>
    </div>
  )
};
