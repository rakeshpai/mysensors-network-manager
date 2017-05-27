import React from 'react';
import { radios } from '../lib/constants';
import { generateId } from '../lib/utils';
import { css } from 'glamor';
import { outlineStyle } from '../styles/forms';
import { success } from '../styles/colors';
import Check from './Check';

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
  hiddenRadio: css({
    marginLeft: '-2em',
    opacity: 0,
    position: 'absolute',

    '&:checked + label': {
      borderColor: success,
      opacity: 1
    },

    '&:focus + label': { ...outlineStyle },
  }),
  label: css({
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
    opacity: 0.8,

    '&:hover': {
      borderColor: '#666',
      opacity: 0.9
    },

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

const Radio = ({ radio, isSelected, onRadioChange }) => {
  const id = generateId();

  return <div className={styles.radioContainer}>
    <input type='radio' name='radio'
      value={radio.name} onChange={evt => onRadioChange(evt.target.value)}
      checked={isSelected}
      className={styles.hiddenRadio} id={id} />

    <label htmlFor={id} className={styles.label}>
      {isSelected && <span className={styles.check}>
        <Check />
      </span>}

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
    </label>
  </div>
};

export default ({ selectedRadio, onRadioChange }) => (
  <div className={styles.container}>
    {radios.map(radio => <Radio radio={radio}
      key={radio.name}
      isSelected={selectedRadio === radio.name}
      onRadioChange={onRadioChange} />
    )}
  </div>
);
