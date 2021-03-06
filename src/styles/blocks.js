import React from 'react';
import { css } from 'glamor';
import { pageHeading } from './typography';

const info = css({
  padding: '10px 15px',
  margin: '10px 0 20px',
  background: '#fff5cc',
  borderLeft: '5px solid #f39389',
  fontSize: '0.9em',

  '& p': {
    margin: 0
  }
});
export const Info = ({ children }) => <div className={info}>{children}</div>

const focus = e => {
  e && e.focus();
}

export const PageHeading = ({ children }) => (
  <h2 className={pageHeading} tabIndex={-1} ref={focus}>
    {children}
  </h2>
);
