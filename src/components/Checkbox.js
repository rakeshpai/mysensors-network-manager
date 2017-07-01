import React from 'react';

import { css } from 'glamor';
import { success } from '../styles/colors';

import { Check, Square } from './Icons';

const styles = {
  container: css({
    display: 'inline-block',
    position: 'relative'
  }),

  hiddenRadio: css({
    marginLeft: '-2em',
    opacity: 0,
    position: 'absolute',
  })
};

export default ({ type='checkbox', color = success, size = 24, className, ...props }) => (
  <div className={css(styles.container, className)}>
    <input type={type} {...props} className={styles.hiddenRadio} />

    {
      props.checked
      ? <Check size={size} color={color} />
      : <Square size={size} color={'#ddd'} />
    }
  </div>
);
