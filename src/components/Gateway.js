import React, { Component } from 'react';

import { gatewayTypes } from '../lib/constants';

import { css } from 'glamor';
import { pageHeading, pageSubheading, subheading } from '../styles/typography';
import { info, outlineStyle } from '../styles/forms';
import { success } from '../styles/colors';
import tabs from '../styles/tabs';

import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { RightAlignedLabel, TopAlignedLabel, InlineLabel } from './FormLabels';
import Checkbox from './Checkbox';
import { NavPage, ColumnContainer, LeftColumn, RightColumn } from './Layouts';
import PageMenu from './PageMenu';
import { Form as NodeForm } from './Node';
import NotFound from './NotFound';

const styles = {
  gatewayList: css({
    listStyle: 'none',
    padding: '20px 0',
    maxWidth: 500
  }),
  radioLabel: css({
    display: 'block',
    padding: '10px 10px 10px 45px',
    position: 'relative',
    marginBottom: 15,
    border: '1px solid #ccc',
    borderRadius: 5
  }),
  radioLableChecked: css({
    borderColor: success
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

class GatewayTypePicker extends Component {
  constructor(props) {
    super(props);
    this.state = { focussed: false };
  }

  onFocus(e) { this.setState({ focussed: e.target.value }) }
  onBlur(e) { this.setState({ focussed: false }) }

  render() {
    const { selectedGatewayType, onGatewayTypeChange } = this.props;
    const focussed = this.state.focussed;

    return (
      <div className={styles.gatewayList}>
        {gatewayTypes.map(gatewayType => {
          const checked = selectedGatewayType === gatewayType.name;

          return (
            <label key={gatewayType.name} className={css(
                styles.radioLabel,
                checked && styles.radioLableChecked,
                (focussed === gatewayType.name) && {...outlineStyle}
              )}>
              <Checkbox type='radio' name='gatewayType' value={gatewayType.name}
                checked={checked} className={styles.check}
                onChange={onGatewayTypeChange} size={30}
                onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)} />
              {gatewayType.title}
              <p className={styles.gatewayDescription}>{gatewayType.description}</p>
            </label>
          )
        })}
      </div>
    )
  }
}

export default props => {
  const { networks, match } = props;

  const networkId = match.params.networkId;
  const network = networks.find(n => n.id === networkId);
  if(!network) return <NotFound />;

  const gateway = network.nodes.find(n => n.type === 'gateway');
  if(!gateway) return <NotFound />;

  const handlers = props.createHandlers(networkId, gateway.id);

  const ipPattern = '(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)';

  return (
    <NavPage {...props}>
      <PageMenu network={network} node={gateway} handlers={handlers} view='edit' />

      <h2 className={pageHeading}>
        Gateway
      </h2>
      <p className={pageSubheading}>
        The gateway acts as the bridge between the {network.radio} network, and the controller running on a computer.
      </p>

      <Tabs className={tabs.toString()}>
        <TabList>
          <Tab>Gateway settings</Tab>
          <Tab>Other settings</Tab>
        </TabList>

        <TabPanel>
          <h3 className={subheading}>Gateway settings</h3>
          <ColumnContainer>
            <LeftColumn>
              Which type of gateway are you using?
              <GatewayTypePicker selectedGatewayType={gateway.gatewayType}
                onGatewayTypeChange={e => handlers.setType(e.target.value)} />


              {['esp8266', 'ethernet'].includes(gateway.gatewayType) && (
                <div>
                  How should the gateway connect to the controller?

                  <div className={css({margin: '10px 0 20px 0'})}>
                    <InlineLabel label='As a server, listenting to incoming connections from the controller.'>
                      <input type='radio' name='mode' value='server'
                        checked={gateway.conn.type === 'server'}
                        onChange={e => handlers.setMode('server')} />
                    </InlineLabel>

                    <InlineLabel label={'As a client, connecting to the controller\'s server.'}>
                      <input type='radio' name='mode' value='client'
                        checked={gateway.conn.type === 'client'}
                        onChange={e => handlers.setMode('client')} />
                    </InlineLabel>

                    <InlineLabel label='Connect to a MQTT broker.'>
                      <input type='radio' name='mode' value='mqtt'
                        checked={gateway.conn.type === 'mqtt'}
                        onChange={e => handlers.setMode('mqtt')} />
                    </InlineLabel>
                  </div>

                  {gateway.conn.type === 'server' && (
                    <fieldset>
                      <legend>Server settings</legend>

                      <RightAlignedLabel label='Listening port'>
                        <input type='number' value={gateway.conn.serverPort}
                          min='1' max='65535' pattern='\d*'
                          onChange={e => handlers.setServerPort(parseInt(e.target.value, 10))} />

                        <p className={info}>
                          The port that the gateway should open for incoming connections.
                        </p>
                      </RightAlignedLabel>

                      <RightAlignedLabel label='Max. incoming connections'>
                        <input type='number' value={gateway.conn.serverMaxClients}
                          min='1' max='8' pattern='\d*'
                          onChange={e => handlers.setServerMaxClients(parseInt(e.target.value, 10))} />

                        <p className={info}>
                          Allowing too many incoming connections may cause the gateway to crash!
                        </p>
                      </RightAlignedLabel>
                    </fieldset>
                  )}

                  {gateway.conn.type === 'client' && (
                    <fieldset>
                      <legend>Controller settings</legend>

                      <RightAlignedLabel label='Controller host'>
                        <input type='text' value={gateway.conn.controllerIp} required
                          placeholder='Host or IP'
                          onChange={e => handlers.setControllerIp(e.target.value.trim())} />

                        <p className={info}>
                          The hostname or IP address of the controller
                        </p>
                      </RightAlignedLabel>

                      <RightAlignedLabel label='Port'>
                        <input type='number' value={gateway.conn.controllerPort} required
                          min='1' max='65535' pattern='\d*'
                          onChange={e => handlers.setControllerPort(parseInt(e.target.value, 10))} />
                      </RightAlignedLabel>
                    </fieldset>
                  )}

                  {gateway.conn.type === 'mqtt' && (
                    <fieldset>
                      <legend>MQTT settings</legend>

                      <RightAlignedLabel label='Broker host'>
                        <input type='text' value={gateway.conn.mqttHost} required
                          placeholder='Host or IP'
                          onChange={e => handlers.setMqttHost(e.target.value.trim())} />

                        <p className={info}>
                          The hostname or IP address of the MQTT broker
                        </p>
                      </RightAlignedLabel>

                      <RightAlignedLabel label='Port'>
                        <input type='number' value={gateway.conn.mqttPort} required
                          min='1' max='65535' pattern='\d*'
                          onChange={e => handlers.setMqttPort(parseInt(e.target.value, 10))} />
                      </RightAlignedLabel>
                    </fieldset>
                  )}
                </div>
              )}
            </LeftColumn>
            <RightColumn>
              {gateway.gatewayType === 'esp8266' && (
                <fieldset>
                  <legend>WiFi settings</legend>

                  <TopAlignedLabel label={'Your WiFi\'s SSID'}>
                    <input type='text' value={gateway.wifi.ssid} required
                      placeholder="Enter your WiFi's SSID"
                      onChange={e => handlers.setSsid(e.target.value)} />
                  </TopAlignedLabel>

                  <TopAlignedLabel label={'Your WiFi\'s password'}>
                    <input type='password' value={gateway.wifi.password}
                      placeholder='Enter your WiFi password'
                      onChange={e => handlers.setPassword(e.target.value)} />
                  </TopAlignedLabel>
                </fieldset>
              )}

              {['esp8266', 'ethernet'].includes(gateway.gatewayType) && (
                <fieldset>
                  <legend>Ethernet settings</legend>

                  {gateway.gatewayType === 'ethernet' && (
                    <TopAlignedLabel label='Ethernet module'>
                      <select value={gateway.ethernet.module}
                        onChange={e => handlers.setEthernetModule(e.target.value)}>
                        <option value='w5100'>WizNET (W5100)</option>
                        <option value='enc28j60'>ENC28J60</option>
                      </select>
                    </TopAlignedLabel>
                  )}

                  Network configuration
                  <InlineLabel label='Use DHCP'
                    info={['client', 'mqtt'].includes(gateway.conn.type) ? 'Recommended' : null}
                    inlineInfo={true}>
                    <input type='radio' name='dhcp' value='yes'
                      checked={gateway.ethernet.dhcp}
                      onChange={e => handlers.setDhcp(true)} />
                  </InlineLabel>

                  <InlineLabel label={'Configure the network manually'}
                    info={gateway.conn.type === 'server' ? 'Recommended' : null}
                    inlineInfo={true}>
                    <input type='radio' name='dhcp' value='no'
                      checked={!gateway.ethernet.dhcp}
                      onChange={e => handlers.setDhcp(false)} />
                  </InlineLabel>

                  {!gateway.ethernet.dhcp && (
                    <fieldset>
                      <legend>Manual network configuration</legend>

                      <TopAlignedLabel label='Static IP'>
                        <input type='text' value={gateway.ethernet.ip}
                          pattern={ipPattern} required
                          onChange={e => handlers.setIp(e.target.value)} />
                      </TopAlignedLabel>

                      <TopAlignedLabel label='Gateway IP'>
                        <input type='text' value={gateway.ethernet.gateway}
                          pattern={ipPattern} required
                          onChange={e => handlers.setGateway(e.target.value)} />
                      </TopAlignedLabel>

                      <TopAlignedLabel label='Subnet mask'>
                        <input type='text' value={gateway.ethernet.subnet}
                          pattern={ipPattern} required
                          onChange={e => handlers.setSubnet(e.target.value)} />
                      </TopAlignedLabel>
                    </fieldset>
                  )}
                </fieldset>
              )}
            </RightColumn>
          </ColumnContainer>
        </TabPanel>
        <TabPanel>
          <h3 className={subheading}>Node settings</h3>
          <NodeForm network={network} node={gateway} handlers={handlers} {...props} />
        </TabPanel>
      </Tabs>
    </NavPage>
  )
}
