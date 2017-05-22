import React from 'react';
import { radios } from '../lib/constants';
import { generateId } from '../lib/utils';

import { css } from 'glamor';
import { pageHeading, heading, headingFontFamily } from '../styles/typography';
import { row, leftCell, rightCell, blockInput, info, successButton, button, footer } from '../styles/forms';

import Radio from './Radio';

const radioBreakpoint = '@media(max-width: 500px)';

const styles = {
  container: css({
    width: '100%',
    maxWidth: 500,
    margin: '0 auto',
    padding: '0 10px'
  }),
  sectionDescription: css({
    color: '#888',
    fontSize: 16,
    fontFamily: headingFontFamily
  }),
  radioContainer: css({
    display: 'table',
    width: '100%',
    verticalAlign: 'top',

    [radioBreakpoint]: {
      margin: '10px 0'
    }
  })
}

const frequencyId = generateId();

export default (props) => {
  const {
    tempNetwork, onRadioChange, onChannelChange,
    onFrequencyChange, createNetwork
  } = props;

  return <div className={styles.container}>
    <h2 className={pageHeading}>Namaskar</h2>
    <p className={styles.sectionDescription}>
      Here you can set up and configure your <a href='https://www.mysensors.org/' target='_blank'>MySensors</a> network.
    </p>

    <h2 className={heading}>Create a network</h2>
    <form onSubmit={e => { e.preventDefault(); createNetwork(tempNetwork); } }>
      Which radio do you want to use for the network?

      <div className={styles.radioContainer}>
        {
          radios.map(radio => <Radio radio={radio}
            key={radio.name}
            network={tempNetwork}
            onRadioChange={onRadioChange} />
          )
        }
      </div>

      <div className={row}>
        <label className={leftCell} htmlFor={frequencyId}>
          Which frequency do you want to use?
        </label>
        <div className={rightCell}>
          {
            tempNetwork.radio === 'NRF24L01+' &&
            <select className={blockInput} id={frequencyId}
              value={tempNetwork.channel}
              onChange={e => onChannelChange(e.target.value)}>
              {Array(126).fill(0).map((_, channel) => <option value={channel + 1} key={channel}>
                {2400 + channel} Mhz
              </option>)}
            </select>
          }

          {
            tempNetwork.radio === 'RFM69' &&
            <select className={blockInput} id={frequencyId}
              value={tempNetwork.frequency}
              onChange={evt => onFrequencyChange(evt.target.value)}>
              {[433,868,915].map(f => <option value={f} key={f}>
                {f} MHz
              </option>)}
            </select>
          }
        </div>
      </div>

      <p className={info}>
        Not all frequencies are available for use in all regions. Please be sure
        to check your local regulations before choosing a frequency.
      </p>

      <div className={footer}>
        <input type='submit' value='Create a network'
          className={css(button, successButton)} />
      </div>
    </form>
  </div>
}
