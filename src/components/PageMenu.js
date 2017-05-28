import React from 'react';
import { css } from 'glamor';

const menu = css({
  float: 'right'
});

export default ({ children }) => (
  <div className={menu}>
    {children}
  </div>
);

const button = css({
  cursor: 'pointer',
  textDecoration: 'underline',
  background: 'none',
  marginLeft: 5,

  border: '1px solid #eee',
  borderRadius: 5,
  padding: '1px 3px',

  '& polygon, & path, & line': {
    fill: '#999',
    stroke: '#999'
  },

  '&:hover': {
    color: '#666',
    borderColor: '#666',

    '& line': {
      stroke: 'blue'
    }
  }
});

const deleteButton = css({
  '&:hover': {
    color: 'red',
    background: 'pink',
    borderColor: 'red',

    '& polygon, & path': {
      fill: 'red'
    }
  }
})

export const DeleteButton = ({ width = 22, onClick, title }) => (
  <button className={css(button, deleteButton)} onClick={onClick} title={title}>
    <svg style={{enableBackground: 'new 0 0 64 64'}} width={width} height={width} version="1.1" viewBox="0 0 64 64">
      <g transform="translate(232, 228)">
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

export const AddButton = ({ onClick, title, width = 22 }) => (
  <button className={css(button)} onClick={onClick} title={title}>
    <svg width={width} height={width} version="1.1" viewBox="0 0 42 42" style={{enableBackground: 'new 0 0 42 42'}}>
      <line x1='21' y1='4' x2='21' y2='38' strokeWidth='4' />
      <line x1='4' y1='21' x2='38' y2='21' strokeWidth='4' />
    </svg>
  </button>
)
