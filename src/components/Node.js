import React from 'react';

import { ColumnContainer, LeftColumn, RightColumn } from './Layouts';
import Collapsible from './Collapsible'
import { InlineLabel, TopAlignedLabel, RightAlignedLabel } from './Forms';
import { info } from '../styles/forms';

export const Form = ({ network, node, handlers }) => (
  <ColumnContainer>
    <LeftColumn>
      <div>
        {node.type !== 'gateway' && (
          <RightAlignedLabel label='Name this type of node'>
            <input type='text' value={node.name} />
            <p className={info}>
              Example: 'MotionSensor', or 'GardenLights'
            </p>
          </RightAlignedLabel>
        )}
        {node.type !== 'gateway' && (
          <InlineLabel label='This node is battery powered'>
            <input type='checkbox' checked={node.batteryPowered}
              onChange={e => handlers.setBatteryPowered(e.target.checked)} />
          </InlineLabel>
        )}
        {network.radio === 'NRF24L01+' && (
          <InlineLabel
            label={'This node uses the NRF24L01+ PA+LNA module with a good power supply.'}
            info='The power supply should be able to able to supply 100 mA bursts.'>
            <input type='checkbox' checked={node.pa}
              onChange={e => handlers.setPA(e.target.checked)} />
          </InlineLabel>
        )}

        {network.radio === 'RFM69' && (
          <InlineLabel label={'This node uses the RFM69HW module with a good power supply.'}>
            <input type='checkbox' checked={node.hw}
              onChange={e => handlers.setHW(e.target.checked)} />
          </InlineLabel>
        )}
      </div>
    </LeftColumn>
    <RightColumn>
      <Collapsible trigger='Security settings' withBg={true}>
        <TopAlignedLabel label='Device key'>
          <input type='text' value={node.key} required
            pattern='[0-9a-fA-F]{18}|(0x[0-9a-fA-F]{2}\s*,\s*){9}'
            onChange={e => handlers.setDeviceKey(e.target.value)} />
          <p className={info}>An 18 digit hex number used for encryption</p>
        </TopAlignedLabel>
      </Collapsible>
    </RightColumn>
  </ColumnContainer>
)

export default props => (
  <div>
    Node page
  </div>
);
