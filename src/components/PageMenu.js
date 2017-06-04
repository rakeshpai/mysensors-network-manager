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
  <button className={button} onClick={onClick} title={title}>
    <svg width={width} height={width} version="1.1" viewBox="0 0 42 42" style={{enableBackground: 'new 0 0 42 42'}}>
      <line x1='21' y1='4' x2='21' y2='38' strokeWidth='4' />
      <line x1='4' y1='21' x2='38' y2='21' strokeWidth='4' />
    </svg>
  </button>
)

export const DownloadButton = ({ onClick, title, width = 22 }) => (
  <button className={button} onClick={onClick} title={title}>
    <svg width={width} height={width} version="1.1" viewBox="0 0 471.2 471.2" style={{enableBackground: 'new 0 0 471.2 471.2'}}>
      <path d="M457.7,230.15c-7.5,0-13.5,6-13.5,13.5v122.8c0,33.4-27.2,60.5-60.5,60.5H87.5c-33.4,0-60.5-27.2-60.5-60.5v-124.8
        c0-7.5-6-13.5-13.5-13.5s-13.5,6-13.5,13.5v124.8c0,48.3,39.3,87.5,87.5,87.5h296.2c48.3,0,87.5-39.3,87.5-87.5v-122.8
        C471.2,236.25,465.2,230.15,457.7,230.15z"/>
      <path d="M226.1,346.75c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4l85.8-85.8c5.3-5.3,5.3-13.8,0-19.1c-5.3-5.3-13.8-5.3-19.1,0l-62.7,62.8
        V30.75c0-7.5-6-13.5-13.5-13.5s-13.5,6-13.5,13.5v273.9l-62.8-62.8c-5.3-5.3-13.8-5.3-19.1,0c-5.3,5.3-5.3,13.8,0,19.1
        L226.1,346.75z"/>
    </svg>
  </button>
)
