import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';

import { css } from 'glamor';
import { switcherContainer, switcherItem, switcherItemSelected } from '../styles/switcher.js';

import { EditIcon, CodeIcon, HamburgerIcon } from './Icons';

import asyncComponent from '../lib/asyncComponent';

const styles = {
  menu: css({
    float: 'right',
    paddingTop: 15,

    '& .dropdown': {
      display: 'inline-block',
      position: 'relative'
    },
    '& .dropdown__content': {
      display: 'none',
      position: 'absolute',
      right: '0',
      top: 36,
      minWidth: 250,
      background: 'white',
      border: '1px solid #eee',
      padding: 5,
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
      zIndex: 1,

      '& ul': {
        padding: 0,

        '& li': {
          listStyle: 'none',
          margin: 0
        }
      },

      '& hr': {
        border: 0,
        height: 1,
        background: '#eee'
      }
    },
    '& .dropdown--active .dropdown__content': {
      display: 'block'
    }
  }),
  switcher: css(switcherContainer, {
    '& li': css(switcherItem, {
      '& span, & a': {
        padding: '7px 10px 5px',
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',

        '& svg': {
          marginRight: 5
        }
      }
    })
  }),
  dropdownTrigger: css({
    padding: '5px 7px 2px',
    display: 'inline-block',
    border: '1px solid #ddd',
    borderRadius: 5,
    marginLeft: 10,
    marginTop: -3,
    cursor: 'pointer',
    backgroundImage: 'linear-gradient(to bottom, #fff, #eee)',

    '.dropdown--active &': {
      boxShadow: 'inset 0 0.15em 0.3em rgba(27,31,35,0.15)',
      backgroundImage: 'none',

      '&:hover, &:focus': {
        backgroundImage: 'none'
      }
    },

    '&:hover, &:focus': {
      backgroundImage: 'linear-gradient(to bottom, #fff, #ddd)',
    }
  })
}

const AsyncHamburgerMenu = asyncComponent(() => import('./HamburgerMenu'));

export default ({ network, node, view, handlers }) => {
  let dropdown;

  const closeDropdown = () => dropdown.hide();

  return (
    <div className={styles.menu}>
      {node && (
        <ul className={styles.switcher}>
          <li className={css(view === 'edit' && switcherItemSelected)}>
            {view === 'edit'?<span><EditIcon /> Design</span>:<Link to={`/networks/${network.id}/${node.type === 'gateway'?'gateway':node.id}`}><EditIcon /> Design</Link>}
          </li>
          <li className={css(view !== 'edit' && switcherItemSelected)}>
            {view === 'edit'?<Link to={`/networks/${network.id}/${node.type === 'gateway' ? 'gateway' : node.id}/code`}><CodeIcon /> Code</Link>:<span><CodeIcon /> Code</span>}
          </li>
        </ul>
      )}

      <Dropdown ref={r => dropdown = r}>
        <DropdownTrigger>
          <span className={styles.dropdownTrigger}>
            <HamburgerIcon />
          </span>
        </DropdownTrigger>
        <DropdownContent>
          <AsyncHamburgerMenu {...{ network, node, handlers, closeDropdown }} />
        </DropdownContent>
      </Dropdown>
    </div>
  )
};
