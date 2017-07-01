import React from 'react';

import { css } from 'glamor';
import { success } from '../styles/colors';
import { pop } from '../styles/animations';

import { Check, Square } from './Icons';

const styles = {
  container: css({
    display: 'inline-block',
    position: 'relative',
    animation: pop,
  }),

  hiddenRadio: css({
    marginLeft: '-2em',
    opacity: 0,
    position: 'absolute',
  })
};

export default ({ type='checkbox', size = 24, className, ...props }) => (
  <div className={css(styles.container, className)}>
    <input type={type} {...props} className={styles.hiddenRadio} />

    {
      props.checked
      ? <Check size={size} color={success} />
      : <Square size={size} color={'#ddd'} />
    }
  </div>
);
