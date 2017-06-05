import React from 'react';

import { ColumnContainer, LeftColumn, RightColumn } from './Layouts';
import Collapsible from './Collapsible';
import NotFound from './NotFound';
import { NavPage } from './Layouts';
import { InlineLabel, TopAlignedLabel, RightAlignedLabel } from './Forms';
import { AnalogPins } from './Pins';
import PageMenu, { DownloadButton } from './PageMenu';

import { css } from 'glamor';
import { pageHeading, pageSubheading } from '../styles/typography';
import { info } from '../styles/forms';

import generateSketch from '../sketch-generator';

export const Form = ({ network, node, handlers }) => (
  <ColumnContainer>
    <LeftColumn>
      <div>
        {node.type !== 'gateway' && (
          <RightAlignedLabel label='Name this type of node'>
            <input type='text' value={node.name}
              onChange={e => handlers.setName(e.target.value)} />
            <p className={info}>
              Example: 'MotionSensor', or 'GardenLights'
            </p>
          </RightAlignedLabel>
        )}
        {network.radio === 'NRF24L01+' && (
          <InlineLabel
            label={'This node uses the NRF24L01+ PA+LNA module with a good power supply.'}
            info='The power supply should be able to supply 100 mA bursts.'>
            <input type='checkbox' checked={node.pa}
              onChange={e => handlers.setPA(e.target.checked)} />
          </InlineLabel>
        )}

        {network.radio === 'RFM69' && (
          <InlineLabel label={'This node uses the RFM69HW module with a good power supply.'}
            info='The power supply should be able to supply 130mA bursts.'>
            <input type='checkbox' checked={node.hw}
              onChange={e => handlers.setHW(e.target.checked)} />
          </InlineLabel>
        )}

        {node.type !== 'gateway' && (
          <div>
            <InlineLabel label='This node is battery-powered'>
              <input type='checkbox' checked={node.battery.powered}
                onChange={e => handlers.setBatteryPowered(e.target.checked)} />
            </InlineLabel>
          </div>
        )}

        {node.type !== 'gateway' && node.battery.powered && (
          <div>
            <RightAlignedLabel label='Sleep for'>
              <input type='number' value={node.sleepTime}
                min='0' max='32767' className={css({ marginRight: 5 })} />
              <select value={node.sleepUnit}>
                {['seconds', 'minutes', 'hours', 'days'].map(u => <option value={u}>{u}</option>)}
              </select>
            </RightAlignedLabel>
          </div>
        )}
      </div>
    </LeftColumn>
    <RightColumn>
      {node.battery.powered && (
        <Collapsible trigger='Battery measurement' withBg={true} open={true}>
          <RightAlignedLabel label='Battery voltage range'>
            <div className={css({display: 'table'})}>
              <div className={css({display: 'table-cell', paddingRight: 10})}>
                <input type='number' min='0' max='24' step='0.1' pattern='\d*'
                  value={node.battery.min} onChange={e => handlers.setBatteryMin(e.target.value)} />
                <p className={info}>Min</p>
              </div>
              <div className={css({display: 'table-cell'})}>
                <input type='number' min='0' max='24' step='0.1' pattern='\d*'
                  value={node.battery.max} onChange={e => handlers.setBatteryMax(e.target.value)} />
                <p className={info}>Max</p>
              </div>
            </div>
          </RightAlignedLabel>

          <RightAlignedLabel label='Measure battery voltage'>
            <select value={node.battery.measure} onChange={e => handlers.setMeasure(e.target.value)}>
              <option value='internal'>internally, using the Vcc voltage</option>
              <option value='external'>externally, using an analog pin</option>
            </select>
          </RightAlignedLabel>

          {node.battery.measure === 'external' && (
            <RightAlignedLabel label='Measurement pin'>
              <AnalogPins value={node.battery.measurePin}
                onChange={e => handlers.setMeasurePin(e.target.value)} />
            </RightAlignedLabel>
          )}

          {node.battery.measure === 'external' && (
            <RightAlignedLabel label='Volts per bit'>
              <input type='text' value={node.battery.voltsPerBit}
                onChange={e => handlers.setVoltsPerBit(e.target.value)} />
              <p className={info}>
                This value depends on your choice of voltage divider resistors.
              </p>
            </RightAlignedLabel>
          )}
        </Collapsible>
      )}

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

export default props => {
  const { networks, match } = props;

  const networkId = match.params.networkId;
  const network = networks.find(n => n.id === networkId);
  if(!network) return <NotFound />

  const node = network.nodes.find(n => n.id === match.params.nodeId);
  if(!node) return <NotFound />

  const handlers = props.createHandlers(networkId, node.id);

  return (
    <NavPage {...props}>
      <PageMenu>
        <DownloadButton title='Download the sketch for this node' onClick={_ => generateSketch({ network, nodeId: node.id }, 'arduino' ) } />
      </PageMenu>

      <h2 className={pageHeading}>
        {node.name || 'Unnamed node'}
      </h2>
      <p className={pageSubheading}>
        Describe how this node is built
      </p>

      <Form network={network} node={node} handlers={handlers} />
    </NavPage>
  )
};
