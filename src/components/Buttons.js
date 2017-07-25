import React from 'react';

import { css } from 'glamor';
import { button } from '../styles/forms';
import { linkColor } from '../styles/colors';
import { transition } from '../styles/animations';

import { Trash } from './Icons';

export const Button = ({children, ...props}) => (
  <button className={button} {...props}>{children}</button>
)

const bigButton = css(button, {
  fontSize: 16,
  padding: '10px 25px'
});

export const PrimaryButton = ({type = 'submit', big = true, children, ...props}) => (
  <button type={type} className={ big ? bigButton : button } {...props}>
    {children}
  </button>
)

const deleteButton = css(button, {
  padding: '3px 3px 1px 3px',

  '& svg': { transition },

  '&:hover': {
    color: 'red',
    backgroundImage: 'linear-gradient(to bottom, #fff, pink)',
    borderColor: 'red',

    '& svg': { stroke: 'red' }
  }
});

export const DeleteButton = ({ width = 22, ...props }) => (
  <button className={deleteButton} {...props}>
    <Trash />
  </button>
);

const dangerButton = css(button, {
  borderColor: 'red',
  color: 'red',
  fontSize: 16,
  backgroundImage: 'linear-gradient(to bottom, #fff, #fff6f6)',

  '&:hover, &:focus': {
    color: 'red',
    borderColor: 'red',
    background: '#fdd'
  }
});

export const DangerButton = ({children, ...props}) => (
  <button type='submit' className={dangerButton} {...props}>
    {children}
  </button>
);

const linkButton = css({
  background: 'none',
  border: 'none',
  color: linkColor,
  cursor: 'pointer',

  ':hover': {
    textDecoration: 'underline'
  }
});

export const LinkButton = ({className, children, ...props}) => (
  <button className={css(linkButton, className)} {...props}>
    {children}
  </button>
);
