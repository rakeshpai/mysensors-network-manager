import React from 'react';
import { radios } from '../lib/constants';
import { css } from 'glamor';
import { success } from '../styles/colors';
import RadioInput from './RadioInput';

const breakpoint = '@media(max-width: 500px)';

const styles = {
  container: css({
    display: 'table',
    width: '100%',
    verticalAlign: 'top',

    [breakpoint]: {
      margin: '10px 0'
    }
  }),
  radioContainer: css({
    display: 'table-cell',
    width: '50%',

    [breakpoint]: {
      display: 'block',
      width: '100%'
    }
  }),
  label: css({
    position: 'relative',
    margin: '30px 10px',
    padding: 10,
    textAlign: 'center',

    [breakpoint]: {
      margin: '10px'
    }
  }),
  image: css({
    [breakpoint]: {
      display: 'table-cell',
      verticalAlign: 'middle',
      width: '30%',

      '& img': {
        width: '70%',
        height: 'auto'
      }
    }
  }),
  radioName: css({
    marginBottom: 30,

    [breakpoint]: {
      textAlign: 'left',
      marginBottom: 5
    }
  }),
  radioInfo: css({
    textAlign: 'left',
    fontSize: 12
  }),
  description: css({
    [breakpoint]: {
      display: 'table-cell',
      verticalAlign: 'middle'
    }
  }),
  check: css({
    position: 'absolute',
    top: -10,
    left: -10,

    [breakpoint]: {
      top: '50%',
      marginTop: -20
    }
  }),
  pros: css({
    color: success
  }),
  cons: css({
    color: 'red'
  })
}

export default ({ selectedRadio, onRadioChange }) => (
  <div className={styles.container}>
    {radios.map(radio => (
      <div className={styles.radioContainer} key={radio.name}>
        <RadioInput name='radio' value={radio.name}
          checked={selectedRadio === radio.name}
          onChange={e => onRadioChange(e.target.value)}
          checkClassName={styles.check} className={styles.label}>

          <div className={styles.image}>
            <img src={radio.image} width='150' height='137'
              className={radio.name === 'RFM69' && css({padding: '12px 0'})}
              alt={`${radio.name} module`} />
          </div>

          <div className={styles.description}>
            <div className={styles.radioName}>
              {radio.name}
            </div>

            <div className={styles.radioInfo}>
              <div>
                <span className={styles.pros}>Pros: </span>
                {radio.pros}
              </div>
              {' '}
              <div>
                <span className={styles.cons}>Cons: </span>
                {radio.cons}
              </div>
            </div>
          </div>
        </RadioInput>
      </div>
    ))}
  </div>
);
