import React from 'react';

import { css } from 'glamor';
import { pageHeading, pageSubheading } from '../styles/typography';
import { row, leftCell, rightCell, info } from '../styles/forms';

import { NavPage } from './Layouts';
import PageMenu, {DeleteButton} from './PageMenu';
import RadioPicker from './RadioPicker';
import FrequencyPicker from './FrequencyPicker';
import NotFound from './NotFound';

import { generateId, formatNumber } from '../lib/utils';

export default props => {
  const network = props.networks.find(n => n.id === props.match.params.networkId);

  if(!network) return <NotFound />;

  const frequencyId = generateId();

  return <NavPage {...props}>
    <PageMenu>
      <DeleteButton onClick={e => props.deleteNetwork(network.id)} />
    </PageMenu>
    <h2 className={pageHeading}>
      {network.radio} based network
    </h2>
    <p className={pageSubheading}>
      Operating at {formatNumber(network.frequency)} MHz.
    </p>

    <div className={css({maxWidth: 500, paddingTop: 20})}>
      Change the radio:
      <RadioPicker selectedRadio={network.radio}
        onRadioChange={radio => props.changeRadio(network.id, radio)} />

      <div className={row}>
        <label className={leftCell} htmlFor={frequencyId}>
          Which frequency do you want to use?
        </label>
        <div className={rightCell}>
          <FrequencyPicker
            id={frequencyId}
            radio={network.radio}
            nrfFrequency={network.frequency}
            rfmFrequency={network.frequency}
            onNrfFreqChange={f => props.onFrequencyChange(network.id, f)}
            onRfmFreqChange={f => props.onFrequencyChange(network.id, f)} />
        </div>
      </div>
      <p className={info}>
        Not all frequencies are available for use in all regions. Please be sure
        to check your local regulations before choosing a frequency.
      </p>
    </div>
  </NavPage>
};
