import React, { Component } from 'react';
import { radios } from '../lib/constants';
import { generateId } from '../lib/utils';

import { css } from 'glamor';
import { FullPage } from './Layouts';
import { pageHeading, heading, pageSubheading } from '../styles/typography';
import { info, successButton, button, footer } from '../styles/forms';

import { RightAlignedLabel } from './Forms';
import RadioPicker from './RadioPicker';
import FrequencyPicker from './FrequencyPicker';

const Greeting = props => (
  <div>
    <h2 className={pageHeading}>Namaskar</h2>
    <p className={pageSubheading}>
      Here you can set up and configure your <a href='https://www.mysensors.org/' target='_blank' rel='noopener noreferrer'>MySensors</a> network.
    </p>
  </div>
);

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      radio: 'NRF24L01+',
      nrfChannel: radios.find(r => r.name === 'NRF24L01+').defaultChannel,
      rfmFrequency: radios.find(r => r.name === 'RFM69').defaultFrequency
    };

    this.frequencyId = generateId();
  }

  onRadioChange(radio) { this.setState({ radio }); }
  onNrfChannelChange(nrfChannel) { this.setState({ nrfChannel }) };
  onRfmFrequencyChange(rfmFrequency) { this.setState({ rfmFrequency }) };

  onSubmit(e) {
    e.preventDefault();

    const { radio, nrfChannel, rfmFrequency } = this.state;
    this.props.createNetwork({ radio, nrfChannel, rfmFrequency });
  }

  render() {
    return (
      <FullPage>
        <Greeting {...this.props} />

        <h2 className={heading}>Create a network</h2>
        <form onSubmit={this.onSubmit.bind(this)}>
          Which radio do you want to use for the network?

          <RadioPicker selectedRadio={this.state.radio}
            onRadioChange={this.onRadioChange.bind(this)} />

          <RightAlignedLabel label='Frequency' htmlFor={this.frequencyId}>
            <FrequencyPicker
              id={this.frequencyId}
              {...this.state}
              onNrfChannelChange={this.onNrfChannelChange.bind(this)}
              onRfmFrequencyChange={this.onRfmFrequencyChange.bind(this)} />
            <p className={info}>
              Not all frequencies are available for use in all regions. Please be sure
              to check your local regulations before choosing a frequency.
            </p>
          </RightAlignedLabel>

          <div className={footer}>
            <input type='submit' value='Create a network'
              className={css(button, successButton)} />
          </div>
        </form>
      </FullPage>
    )
  }
}
