import React from 'react';
import { css } from 'glamor';

const container = css({
  position: 'relative'
});

const menu = css({
  position: 'absolute',
  top: 20,
  right: 0
});

export default ({ children }) => (
  <div className={container}>
    <div className={menu}>
      {children}
    </div>
  </div>
);

const deleteButton = css({
  cursor: 'pointer',
  textDecoration: 'underline',
  background: 'none',

  border: '1px solid #eee',
  borderRadius: 5,
  padding: 3,

  '& polygon, & path': {
    fill: '#999'
  },

  '&:hover': {
    color: 'red',
    background: 'pink',
    borderColor: 'red',

    '& polygon, & path': {
      fill: 'red'
    }
  }
})

export const DeleteButton = ({ width = 22, onClick }) => (
  <button className={deleteButton} onClick={onClick}>
    <svg style={{enableBackground: 'new 0 0 64 64'}} width={width} height={width} version="1.1" viewBox="0 0 64 64">
      <g id="Icon-Trash" transform="translate(232.000000, 228.000000)">
        <polygon points="-207.5,-205.1 -204.5,-205.1 -204.5,-181.1 -207.5,-181.1"/>
        <polygon points="-201.5,-205.1 -198.5,-205.1 -198.5,-181.1 -201.5,-181.1"/>
        <polygon points="-195.5,-205.1 -192.5,-205.1 -192.5,-181.1 -195.5,-181.1"/>
        <polygon points="-219.5,-214.1 -180.5,-214.1 -180.5,-211.1 -219.5,-211.1"/>
        <path d="M-192.6-212.6h-2.8v-3c0-0.9-0.7-1.6-1.6-1.6h-6c-0.9,0-1.6,0.7-1.6,1.6v3h-2.8v-3 c0-2.4,2-4.4,4.4-4.4h6c2.4,0,4.4,2,4.4,4.4V-212.6"/>
        <path d="M-191-172.1h-18c-2.4,0-4.5-2-4.7-4.4l-2.8-36l3-0.2l2.8,36c0.1,0.9,0.9,1.6,1.7,1.6h18 c0.9,0,1.7-0.8,1.7-1.6l2.8-36l3,0.2l-2.8,36C-186.5-174-188.6-172.1-191-172.1"/>
      </g>
    </svg>
  </button>
)
