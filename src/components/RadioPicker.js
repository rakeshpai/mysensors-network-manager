import React, { Component } from 'react';
import { radios } from '../lib/constants';
import { css } from 'glamor';
import { outlineStyle } from '../styles/forms';
import { success } from '../styles/colors';
import Checkbox from './Checkbox';
import { ThumbsUp, ThumbsDown } from './Icons';

const breakpoint = '@media(max-width: 500px)';

const styles = {
  container: css({
    display: 'flex',

    [breakpoint]: {
      display: 'block',
      margin: '10px 10px 10px -10px'
    }
  }),
  label: css({
    flex: 1,
    position: 'relative',

    margin: '30px 10px',
    padding: 10,
    textAlign: 'center',

    borderRadius: 5,
    cursor: 'pointer',
    border: '1px solid #ddd',
    transition: 'all 0.3s ease-in',
    opacity: 0.7,

    '&:hover': {
      borderColor: '#aaa',
      opacity: 0.9
    },

    [breakpoint]: {
      margin: '10px',
      display: 'block',
      width: '100%'
    }
  }),
  checkedLabel: css({
    '&, &:hover': {
      border: `1px solid ${success}`,
      opacity: 1,
    }
  }),
  focussedLabel: css({...outlineStyle}),
  image: css({
    [breakpoint]: {
      display: 'table-cell',
      verticalAlign: 'middle',
      width: '30%',

      '& img': {
        width: '90%',
        height: 'auto'
      }
    }
  }),
  radioName: css({
    marginBottom: 30,

    [breakpoint]: {
      textAlign: 'left',
      marginBottom: 10
    }
  }),
  radioInfo: css({
    textAlign: 'left',
    fontSize: 14
  }),
  radioInfoItem: css({
    display: 'flex',
    paddingBottom: 10,
    width: '100%',

    [breakpoint]: {
      paddingBottom: 0
    }
  }),
  radioInfoIcon: css({
    width: 22,
    paddingTop: 3
  }),
  radioInfoDescription: css({
    width: '100%'
  }),
  description: css({
    [breakpoint]: {
      display: 'table-cell',
      verticalAlign: 'middle'
    }
  }),
  check: css({
    position: 'absolute',
    top: 10,
    left: 10
  })
}

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {focussed: null};
  }

  onFocus(e) { this.setState({focussed: e.target.value}); }
  onBlur() { this.setState({focussed: null}); }

  render() {
    const { selectedRadio, onRadioChange } = this.props;
    const focussed = this.state.focussed;

    return (
      <div className={styles.container}>
        {radios.map(radio => {
          const checked = selectedRadio === radio.name;
          return (
            <label key={radio.name}
              className={css(
                styles.label,
                checked && styles.checkedLabel,
                (focussed === radio.name) && styles.focussedLabel
              )}>
              <Checkbox type='radio' name='radio' value={radio.name}
                checked={checked} className={styles.check}
                onChange={e => onRadioChange(e.target.value)}
                onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)} />

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
                  <div className={styles.radioInfoItem}>
                    <div className={styles.radioInfoIcon}>
                      <ThumbsUp size={14} color='rgba(0,120,0,0.6)' />
                    </div>
                    <div className={styles.radioInfoDescription}>
                      {radio.pros}
                    </div>
                  </div>
                  <div className={styles.radioInfoItem}>
                    <div className={styles.radioInfoIcon}>
                      <ThumbsDown size={14} color='rgba(120,0,0,0.6)' />
                    </div>
                    <div className={styles.radioInfoDescription}>
                      {radio.cons}
                    </div>
                  </div>
                </div>
              </div>
            </label>
          )
        })}
      </div>
    )
  }
};
