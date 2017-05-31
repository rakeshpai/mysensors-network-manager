import React from 'react';

import { css } from 'glamor';
import { pageHeading, pageSubheading } from '../styles/typography';
import { info } from '../styles/forms';

import { NavPage } from './Layouts';
import { ColumnContainer, LeftColumn, RightColumn } from './Layouts';
import PageMenu, {DeleteButton, AddButton} from './PageMenu';
import { RightAlignedLabel, TopAlignedLabel } from './Forms';
import RadioPicker from './RadioPicker';
import FrequencyPicker from './FrequencyPicker';
import Collapsible from './Collapsible';
import { Info } from '../styles/blocks';
import NotFound from './NotFound';

import { radios } from '../lib/constants';
import { generateId } from '../lib/utils';

export default props => {
  const network = props.networks.find(n => n.id === props.match.params.networkId);

  if(!network) return <NotFound />;

  const frequencyId = generateId();

  const frequencyString = radios
    .find(r => r.name === network.radio)
    .frequencies
    .find(f => (network.radio === 'NRF24L01+' ? network.nrfChannel : network.rfmFrequency) === f.value)
    .display;


  return <NavPage {...props}>
    <PageMenu>
      <AddButton title='Add a new node' />
      <DeleteButton onClick={e => props.deleteNetwork(network.id)}
        title='Delete this network' />
    </PageMenu>

    <h2 className={pageHeading}>
      {network.radio} based network
    </h2>
    <p className={pageSubheading}>
      Operating at {frequencyString}.
    </p>

    <ColumnContainer>
      <LeftColumn>
        <div className={css({maxWidth: 500})}>
          Change the radio:
          <RadioPicker selectedRadio={network.radio}
            onRadioChange={radio => props.changeRadio(network.id, radio)} />

          <RightAlignedLabel label='Frequency'>
            <FrequencyPicker
              id={frequencyId}
              radio={network.radio}
              nrfChannel={network.nrfChannel}
              rfmFrequency={network.rfmFrequency}
              onNrfChannelChange={f => props.onNrfChannelChange(network.id, f)}
              onRfmFrequencyChange={f => props.onRfmFrequencyChange(network.id, f)} />
            <p className={info}>
              Not all frequencies are available for use in all regions. Please be sure
              to check your local regulations before choosing a frequency.
            </p>
          </RightAlignedLabel>
        </div>
      </LeftColumn>

      <RightColumn>
        Additional settings:
        <br /><br />
        <Collapsible trigger='Security settings' withBg={true}>
          <Info>
            <p>Psst! These are secrets. Keep them secret. Keep them safe.</p>
          </Info>

          <TopAlignedLabel label='HMAC key'>
            <input type='text' value={network.hmac}
              pattern='[0-9a-fA-F]{64}|(0x[0-9a-fA-F]{2}\s*,\s*){32}'
              onChange={e => props.onHmacChange(network.id, e.target.value)} />
            <p className={info}>A 64 digit hex number used for signing messages</p>
          </TopAlignedLabel>

          <TopAlignedLabel label='AES key'>
            <input type='text' value={network.aes}
              pattern='[0-9a-fA-F]{32}|(0x[0-9a-fA-F]{2}\s*,\s*){16}'
              onChange={e => props.onAesChange(network.id, e.target.value)} />
            <p className={info}>A 32 digit hex number used for encryption</p>
          </TopAlignedLabel>
        </Collapsible>
      </RightColumn>
    </ColumnContainer>
  </NavPage>
};
