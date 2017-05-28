import React from 'react';

import { css } from 'glamor';
import { pageHeading, pageSubheading } from '../styles/typography';
import { row, leftCell, rightCell, info, blockInput, fullWidthLabel, invalid } from '../styles/forms';

import { NavPage } from './Layouts';
import { ColumnContainer, LeftColumn, RightColumn } from './Layouts';
import PageMenu, {DeleteButton, AddButton} from './PageMenu';
import RadioPicker from './RadioPicker';
import FrequencyPicker from './FrequencyPicker';
import Collapsible from './Collapsible';
import { Info } from '../styles/blocks';
import NotFound from './NotFound';

import { generateId, formatNumber } from '../lib/utils';

const colBreakpoint = `@media(max-width: 900px)`;

const styles = {
  colContainer: css({
    display: 'table',
    maxWidth: 870,

    [colBreakpoint]: {
      display: 'block'
    }
  }),
  colLeft: css({
    display: 'table-cell',
    minWidth: 500,

    [colBreakpoint]: {
      display: 'block',
      minWidth: 'auto'
    }
  }),
  colRight: css({
    display: 'table-cell',
    width: '100%',
    paddingLeft: 20,

    [colBreakpoint]: {
      display: 'block',
      padding: '20px 0'
    }
  })
}

export default props => {
  const network = props.networks.find(n => n.id === props.match.params.networkId);

  if(!network) return <NotFound />;

  const frequencyId = generateId();

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
      Operating at {formatNumber(network.frequency)} MHz.
    </p>

    <ColumnContainer>
      <LeftColumn>
        <div className={css({maxWidth: 500})}>
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
      </LeftColumn>
      
      <RightColumn>
        Additional settings:
        <br /><br />
        <Collapsible trigger='Security settings' withBg={true}>
          <Info>
            <p>Psst! These are secrets. Keep them secret. Keep them safe.</p>
          </Info>

          <label className={fullWidthLabel}>
            HMAC key
            <input type='text' value={network.hmac}
              pattern='[0-9a-fA-F]{64}|(0x[0-9a-fA-F]{2}\s*,\s*){32}'
              onChange={e => props.onHmacChange(network.id, e.target.value)}
              className={css(blockInput, invalid)} />
            <p className={info}>A 64 digit hex number used for signing messages</p>
          </label>
          <label className={fullWidthLabel}>
            AES key
            <input type='text' value={network.aes}
              pattern='[0-9a-fA-F]{32}|(0x[0-9a-fA-F]{2}\s*,\s*){16}'
              onChange={e => props.onAesChange(network.id, e.target.value)}
              className={css(blockInput, invalid)} />
            <p className={info}>A 32 digit hex number used for encryption</p>
          </label>
        </Collapsible>
      </RightColumn>
    </ColumnContainer>
  </NavPage>
};
