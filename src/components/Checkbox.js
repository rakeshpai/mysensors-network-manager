import React from 'react';

import { css } from 'glamor';
import { success } from '../styles/colors';
import { outlineStyleThin } from '../styles/forms';
import { pop } from '../styles/animations';

import { Check, Square } from './Icons';

const styles = {
  container: css({
    display: 'inline-block',
    position: 'relative',

    '& svg': {
      animation: pop
    }
  }),

  hiddenRadio: css({
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

export default ({
  type='checkbox',
  color = success,
  size = 16,
  strokeWidth = 2,
  className,
  ...props
}) => (
  <div className={css(styles.container, className)}>
    <input type={type} {...props} className={styles.hiddenRadio} />

    {
      props.checked
      ? <Check size={size} color={color} strokeWidth={strokeWidth} />
      : <Square size={size} color={'#ddd'} strokeWidth={strokeWidth} />
    }
  </div>
);
