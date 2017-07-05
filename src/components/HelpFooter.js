import React from 'react';
import { HamburgerIcon } from './Icons';

import { css } from 'glamor';

const style = css({
  border: '1px solid #e1e4e8',
  padding: 10,
  background: '#fafbfc',
  margin: '20px 0',
  borderRadius: 5,

  '& span': {
    border: '1px solid #ccc',
    borderRadius: 5,
    padding: '5px 5px 0 5px',
    backgroundImage: 'linear-gradient(to bottom, #fff, #eee)'
  }
});

export default props => (
  <div className={style}>
    <strong>Done?</strong> Click the <span><HamburgerIcon /></span> menu
      at the top right of this page for more options.
  </div>
);
