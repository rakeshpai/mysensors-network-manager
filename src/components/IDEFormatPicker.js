import React, { Component } from 'react';
import { switcherContainer, switcherItem, switcherItemSelected } from '../styles/switcher.js';
import { LinkButton } from './Buttons';
import { Arduino, PlatformIO } from './Icons';
import { css } from 'glamor';

const styles = {
  switcherContainer: css(switcherContainer, {
    '& li': css(switcherItem, {
      '& span, & button': {
        padding: '7px 10px 5px',
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        fontSize: 13,

        '&:hover': {
          textDecoration: 'none'
        },

        '& svg': {
          marginRight: 5
        }
      },

      '&.selected': switcherItemSelected
    })
  })
};

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      format: props.format || 'arduino'
    }
  }

  _onChange(format) {
    this.setState({ format });
    (this.props.onChange || (()=>{}))(format)
  }

  render() {
    return (
      <ul className={styles.switcherContainer}>
        <li className={this.state.format === 'arduino' && 'selected'}>
          {
            this.state.format === 'arduino'
            ? (
              <span>
                <Arduino height={18} /> Arduino
              </span>
            )
            : (
              <LinkButton onClick={e => this._onChange('arduino')}>
                <Arduino height={18} /> Arduino
              </LinkButton>
            )
          }
        </li>
        <li className={this.state.format === 'pio' && 'selected'}>
          {
            this.state.format === 'pio'
            ? (
              <span>
                <PlatformIO size={18} /> PlatformIO
              </span>
            )
            : (
              <LinkButton onClick={e => this._onChange('pio')}>
                <PlatformIO size={18} /> PlatformIO
              </LinkButton>
            )
          }
        </li>
      </ul>
    );
  }
}
