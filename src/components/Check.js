import React from 'react';

import { css } from 'glamor';
import { success } from '../styles/colors';

const styles = css({
  display: 'inline-block',
  background: success,
  color: 'white',
  fontSize: 26,
  borderRadius: 20,
  padding: '5px 7px 0px 7px',
  border: '2px solid white',
  boxShadow: '0 0 10px rgba(0,0,0,0.6)',
  fontWeight: 'bold',
  animation: `${css.keyframes({
    '0%': { transform: 'scale(0.1)', opacity: 0 },
    '60%': { transform: 'scale(1.1)', opacity: 1 },
    '100%': { transform: 'scale(1)' }
  })} .3s`
});

export default ({ width=20, height=20 }) => <div className={styles}>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8" width={width} height={height}>
    <path fill='#fff' d="M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z"/>
  </svg>
</div>;
