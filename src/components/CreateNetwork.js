import React, { Component } from 'react';
import { radios } from '../lib/constants';
import { generateId } from '../lib/utils';

import { css } from 'glamor';
import { FullPage } from './Layouts';
import { pageHeading, heading, pageSubheading } from '../styles/typography';
import { row, leftCell, rightCell, info, successButton, button, footer } from '../styles/forms';

import RadioPicker from './RadioPicker';
import FrequencyPicker from './FrequencyPicker';

const Greeting = props => {
  if(props.router.location.pathname !== '/') return null;

  return <div>
    <h2 className={pageHeading}>Namaskar</h2>
    <p className={pageSubheading}>
      Here you can set up and configure your <a href='https://www.mysensors.org/' target='_blank'>MySensors</a> network.
    </p>
  </div>
};

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      radio: 'NRF24L01+',
      nrfFrequency: radios.find(r => r.name === 'NRF24L01+').defaultFrequency,
      rfmFrequency: radios.find(r => r.name === 'RFM69').defaultFrequency
    };

    this.frequencyId = generateId();
  }

  onRadioChange(radio) { this.setState({ radio }); }
  onNrfFreqChange(nrfFrequency) { this.setState({ nrfFrequency }) };
  onRfmFreqChange(rfmFrequency) { this.setState({ rfmFrequency }) };

  onSubmit(e) {
    const { radio, nrfFrequency, rfmFrequency } = this.state;

    e.preventDefault();

    this.props.createNetwork({
      radio,
      frequency: radio === 'NRF24L01+' ? nrfFrequency : rfmFrequency
    })
  }

  render() {
    return <FullPage>
      <Greeting {...this.props} />

      <h2 className={heading}>Create a network</h2>
      <form onSubmit={this.onSubmit.bind(this)}>
        Which radio do you want to use for the network?

        <RadioPicker selectedRadio={this.state.radio}
          onRadioChange={this.onRadioChange.bind(this)} />

        <div className={row}>
          <label className={leftCell} htmlFor={this.frequencyId}>
            Which frequency do you want to use?
          </label>
          <div className={rightCell}>
            <FrequencyPicker
              id={this.frequencyId}
              {...this.state}
              onNrfFreqChange={this.onNrfFreqChange.bind(this)}
              onRfmFreqChange={this.onRfmFreqChange.bind(this)} />
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
    </FullPage>
  }
}
