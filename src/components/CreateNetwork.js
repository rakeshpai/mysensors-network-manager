import React from 'react';
import { radios } from '../lib/constants';
import { generateId } from '../lib/utils';

import { css } from 'glamor';
import { pageHeading, heading, headingFontFamily } from '../styles/typography';
import { row, leftCell, rightCell, blockInput, info, success, button, footer } from '../styles/forms';

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
  twoColContainer: css({
    display: 'table',
    width: '100%',
    verticalAlign: 'top'
  }),
  twoColCell: css({
    display: 'table-cell',
    width: '50%',
  }),
  fauxRadio: css({
    marginLeft: '-2em',
    opacity: 0,
    position: 'absolute',

    '&:checked + label': {
      borderColor: 'green',
      boxShadow: '0px 0px 5px rgba(52,117,237,1)'
    },

    '&:focus + label': {
      boxShadow: '0px 0px 10px rgba(52,117,237,1)'
    },
  }),
  fauxLabel: css({
    display: 'block',
    position: 'relative',
    height: '100%',
    margin: '30px 10px',
    padding: 10,
    borderRadius: 5,
    cursor: 'pointer',
    border: '1px solid #ddd',
    textAlign: 'center',
    color: '#999',
    transition: 'all 0.3s ease-in',

    '&:hover': {
      color: '#111',
      borderColor: '#666'
    }
  }),
  radioName: css({
    marginBottom: 30
  }),
  radioInfo: css({
    textAlign: 'left',
    fontSize: 12,

    '& p': {
      margin: 0,
      color: '#888'
    },
  }),
  check: css({
    background: 'green',
    color: 'white',
    position: 'absolute',
    top: -10,
    left: -10,
    fontSize: 26,
    borderRadius: 20,
    padding: '5px 7px 0px 7px',
    border: '2px solid white',
    boxShadow: '0 0 10px rgba(0,0,0,0.6)',
    fontWeight: 'bold',
    animation: `${css.keyframes({
      '0%': { transform: 'scale(0.1)', opacity: 0 },
      '60%': { transform: 'scale(1.1)', opacity: 1 },
      '100%': { transform: 'scale(1)' }
    })} .3s`
  })
}

const ids = radios.map(_ => generateId());
const channelId = generateId();
const frequencyId = generateId();

const Check = ({ color, width, height }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8" width={width} height={height}>
  <path fill={color} d="M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z"/>
</svg>

export default (props) => {
  const { tempNetwork, onRadioChange, onChannelChange, onFrequencyChange } = props;

  return <div className={styles.container}>
    <h2 className={pageHeading}>Namaste</h2>
    <p className={styles.sectionDescription}>
      Here you can set up and configure your <a href='https://www.mysensors.org/' target='_blank'>MySensors</a> network.
    </p>

    <h2 className={heading}>Create a new network</h2>
    <form>
      Which radio are you using for the network?

      <div className={styles.twoColContainer}>
        {radios.map((radio, radioIndex) => {
          return <div key={radio.name} className={styles.twoColCell}>
            <input type='radio' name='radio'
              value={radio.name} onChange={evt => onRadioChange(evt.target.value)}
              checked={tempNetwork.radio === radio.name}
              className={styles.fauxRadio} id={ids[radioIndex]} />

            <label htmlFor={ids[radioIndex]} className={styles.fauxLabel}>
              {tempNetwork.radio === radio.name && <span className={styles.check}>
                <Check color='#fff' width={20} height={20} />
              </span>}

              <img src={radio.image} width='150' height='137'
                className={radio.name === 'RFM69' && css({padding: '12px 0'})}
                alt={`${radio.name} module`} />

              <div className={styles.radioName}>
                {radio.name}
              </div>

              <div className={styles.radioInfo}>
                <p>Pros: {radio.pros}</p>
                <p>Cons: {radio.cons}</p>
              </div>
            </label>
          </div>
        })}
      </div>

      {tempNetwork.radio === 'NRF24L01+' && <div className={row}>
        <label className={leftCell} htmlFor={channelId}>
          Which frequency (in MHz) do you want to use?
        </label>
        <div className={rightCell}>
          <input type='number' className={blockInput} id={channelId}
            min='2400' max='2525' value={tempNetwork.channel + 2399}
            onChange={evt => onChannelChange(evt.target.value - 2399)} />
        </div>
      </div>}

      {tempNetwork.radio === 'RFM69' && <div className={row}>
        <label className={leftCell} htmlFor={frequencyId}>
          Which frequency do you want to use?
        </label>
        <div className={rightCell}>
          <select value={tempNetwork.frequency} className={blockInput}
            onChange={evt => onFrequencyChange(evt.target.value)}>
          {[433,868,915].map(f => <option value={f} key={f}>
            {f} MHz
          </option>)}
          </select>
        </div>
      </div>}

      <p className={info}>
        Be sure to check your local government regulations to know
        which frequency is ok to use.
      </p>

      <div className={footer}>
        <input type='submit' value='Create a new network'
          className={css(success, button)} />
      </div>
    </form>
  </div>
}
