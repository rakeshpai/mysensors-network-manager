import React from 'react';

import { css } from 'glamor';
import { success } from '../styles/colors';
import { pop } from '../styles/animations';

import { Check } from './Icons';

const styles = css({
  display: 'inline-block',
  animation: pop
});

export default ({ size = 24 }) => <div className={styles}>
  <Check size={size} color={success} />
</div>;
