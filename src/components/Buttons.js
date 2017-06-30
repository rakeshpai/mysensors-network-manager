import React from 'react';
import { css } from 'glamor';

import { Trash } from './Icons';

const button = css({
  cursor: 'pointer',
  textDecoration: 'underline',
  background: 'none',
  marginLeft: 5,

  border: '1px solid #eee',
  borderRadius: 5,
  padding: '1px 3px',

  '&:hover': {
    color: '#666',
    borderColor: '#666',

    '& svg': { stroke: 'red' }
  }
});

const deleteButton = css({
  '&:hover': {
    color: 'red',
    background: 'pink',
    borderColor: 'red',
  }
});

export const DeleteButton = ({ width = 22, onClick, title }) => (
  <button className={css(button, deleteButton)} onClick={onClick} title={title}>
    <Trash />
  </button>
);
