import React from 'react';

import { css } from 'glamor';
import { success } from '../styles/colors';
import { outlineStyleThin } from '../styles/forms';
import { pop } from '../styles/animations';

import { Check, Square, Circle, CheckCircle } from './Icons';

const styles = {
  container: css({
    display: 'inline-block',
    position: 'relative',

    '& svg': {
      animation: pop
    }
  }),

  hiddenInput: css({
    display: 'inline-block',
    opacity: 0,
    position: 'absolute',
    width: '100%',
    height: '100%',

    '&:focus + svg': {
      ...outlineStyleThin
    }
  })
};

const createControl = (defaultType, Checked, Unchecked) => ({
  type = defaultType,
  color = success,
  size = 16,
  strokeWidth = 2,
  className,
  ...props
}) => (
  <div className={css(styles.container, className)}>
    <input type={type} {...props} className={styles.hiddenInput} />

    {
      props.checked
      ? <Checked size={size} color={color} strokeWidth={strokeWidth} />
      : <Unchecked size={size} color={'#ddd'} strokeWidth={strokeWidth} />
    }
  </div>
);

export const Checkbox = createControl('checkbox', Check, Square);
export const RadioButton = createControl('radio', CheckCircle, Circle);
