import React from 'react';
import { generateId } from '../lib/utils';
import { css } from 'glamor';
import Check from './Check';

const radioBreakpoint = '@media(max-width: 500px)';

const styles = {
  radioItem: css({
    display: 'table-cell',
    width: '50%',

    [radioBreakpoint]: {
      display: 'block',
      width: '100%'
    }
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
    },

    [radioBreakpoint]: {
      margin: '10px'
    }
  }),
  radioName: css({
    marginBottom: 30,

    [radioBreakpoint]: {
      textAlign: 'left',
      marginBottom: 5
    }
  }),
  radioInfo: css({
    textAlign: 'left',
    fontSize: 12,

    '& p': {
      margin: 0,
      color: '#888'
    },
  }),
  radioImage: css({
    [radioBreakpoint]: {
      display: 'table-cell',
      verticalAlign: 'middle',
      width: '30%',

      '& img': {
        width: '70%',
        height: 'auto'
      }
    }
  }),
  radioDescription: css({
    [radioBreakpoint]: {
      display: 'table-cell',
      verticalAlign: 'middle'
    }
  }),
  check: css({
    position: 'absolute',
    top: -10,
    left: -10,

    [radioBreakpoint]: {
      top: '50%',
      marginTop: -20
    }
  }),
  pros: css({
    color: 'green'
  }),
  cons: css({
    color: 'red'
  })
}

export default ({ radio, isSelected, onRadioChange }) => {
  const id = generateId();

  return <div className={styles.radioItem}>
    <input type='radio' name='radio'
      value={radio.name} onChange={evt => onRadioChange(evt.target.value)}
      checked={isSelected}
      className={styles.fauxRadio} id={id} />

    <label htmlFor={id} className={styles.fauxLabel}>
      {isSelected && <span className={styles.check}>
        <Check />
      </span>}

      <div className={styles.radioImage}>
        <img src={radio.image} width='150' height='137'
          className={radio.name === 'RFM69' && css({padding: '12px 0'})}
          alt={`${radio.name} module`} />
      </div>

      <div className={styles.radioDescription}>
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
    </label>
  </div>
}
