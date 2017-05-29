import React from 'react';

import { gatewayTypes } from '../lib/constants';

import { css } from 'glamor';
import { pageHeading, pageSubheading } from '../styles/typography';

import NotFound from './NotFound';
import { RightAlignedLabel, TopAlignedLabel, InlineLabel } from './Forms';
import RadioInput from './RadioInput';
import { NavPage } from './Layouts';
import Collapsible from './Collapsible';
import { ColumnContainer, LeftColumn, RightColumn } from './Layouts';

const styles = {
  gatewayList: css({
    listStyle: 'none',
    padding: 0,
    maxWidth: 500
  }),
  radioLabel: css({
    padding: '10px 10px 10px 50px',
    position: 'relative',
    marginBottom: 15
  }),
  check: css({
    position: 'absolute',
    top: 5,
    left: 5,
    transform: 'scale(0.7)'
  }),
  gatewayDescription: css({
    color: '#999',
    fontSize: 14,
    margin: '7px 0 3px'
  })
};

export default props => {
  const { networks, match } = props;

  const networkId = match.params.networkId;
  const network = networks.find(n => n.id === networkId);
  if(!network) return <NotFound />;

  const gateway = network.nodes.find(n => n.type === 'gateway');
  if(!gateway) return <NotFound />;

  const setDhcp = dhcp => _ => props.setDhcp(networkId, dhcp);
  const ipPattern = '(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)';

  return (
    <NavPage {...props}>
      <h2 className={pageHeading}>
        Gateway
      </h2>
      <p className={pageSubheading}>
        The gateway acts as the bridge between the {network.radio} network, and the controller running on a computer.
      </p>

      <ColumnContainer>
        <LeftColumn>
          Which type of gateway are you using?
          <ul className={styles.gatewayList}>
            {gatewayTypes.map(gatewayType => (
              <li key={gatewayType.name}>
                <RadioInput name='gatewayType' value={gatewayType.name}
                  className={styles.radioLabel} checkClassName={styles.check}
                  onChange={e => props.onGatewayTypeChange(networkId, e.target.value)}
                  checked={gatewayType.name === gateway.gatewayType}>
                  {gatewayType.title}
                  <p className={styles.gatewayDescription}>{gatewayType.description}</p>
                </RadioInput>
              </li>
            ))}

            {['esp8266', 'ethernet'].includes(gateway.gatewayType) && (
              <div className={css({marginTop: 30})}>
                How should the gateway connect to the controller?

                <div className={css({marginTop: 10})}>
                  <InlineLabel label='As a server, listenting to incoming connections from the controller.'>
                    <input type='radio' name='mode' value='server'
                      checked={gateway.conn.type === 'server'}/>
                  </InlineLabel>

                  <InlineLabel label={'As a client, connecting to the controller\'s server.'}>
                    <input type='radio' name='mode' value='client'
                      checked={gateway.conn.type === 'client'} />
                  </InlineLabel>

                  <InlineLabel label='Connect to an MQTT broker.'>
                    <input type='radio' name='mode' value='mqtt'
                      checked={gateway.conn.type === 'mqtt'} />
                  </InlineLabel>
                </div>

                <fieldset>
                  <legend>Server settings</legend>
                  
                  {gateway.conn.type === 'server' && (
                    <RightAlignedLabel label='Server address'>
                      <input type='text' />
                    </RightAlignedLabel>
                  )}
                </fieldset>
              </div>
            )}
          </ul>
        </LeftColumn>
        <RightColumn>
          {gateway.gatewayType === 'esp8266' && (
            <div>
              <Collapsible trigger='WiFi settings' withBg={true} open={true}>
                <TopAlignedLabel label={'Your WiFi\'s SSID'}>
                  <input type='text' value={gateway.wifi.ssid} required
                    placeholder="Enter your WiFi's SSID"
                    onChange={e => props.setSsid(networkId, e.target.value)} />
                </TopAlignedLabel>

                <TopAlignedLabel label={'Your WiFi\'s password'}>
                  <input type='password' value={gateway.wifi.password}
                    placeholder='Enter your WiFi password'
                    onChange={e => props.setPassword(networkId, e.target.value)} />
                </TopAlignedLabel>
              </Collapsible>
            </div>
          )}

          {['esp8266', 'ethernet'].includes(gateway.gatewayType) && (
            <div>
              <Collapsible trigger='Ethernet settings' withBg={true} open={true}>
                <InlineLabel label='Use DHCP'>
                  <input type='radio' name='dhcp' value='yes'
                    checked={gateway.ethernet.dhcp}
                    onChange={setDhcp(true)} />
                </InlineLabel>

                <InlineLabel label='Configure the network manually'>
                  <input type='radio' name='dhcp' value='no'
                    checked={!gateway.ethernet.dhcp}
                    onChange={setDhcp(false)} />
                </InlineLabel>

                {!gateway.ethernet.dhcp && (
                  <fieldset>
                    <legend>Manual network configuration</legend>

                    <TopAlignedLabel label='Static IP'>
                      <input type='text' value={gateway.ethernet.ip}
                        pattern={ipPattern} required
                        onChange={e => props.setIp(networkId, e.target.value)} />
                    </TopAlignedLabel>

                    <TopAlignedLabel label='Gateway IP'>
                      <input type='text' value={gateway.ethernet.gateway}
                        pattern={ipPattern} required
                        onChange={e => props.setGateway(networkId, e.target.value)} />
                    </TopAlignedLabel>

                    <TopAlignedLabel label='Subnet mask'>
                      <input type='text' value={gateway.ethernet.subnet}
                        pattern={ipPattern} required
                        onChange={e => props.setSubnet(networkId, e.target.value)} />
                    </TopAlignedLabel>
                  </fieldset>
                )}
              </Collapsible>
            </div>
          )}
        </RightColumn>
      </ColumnContainer>
    </NavPage>
  )
}
