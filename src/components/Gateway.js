import React from 'react';

import { gatewayTypes } from '../lib/constants';

import { css } from 'glamor';
import { pageHeading, pageSubheading } from '../styles/typography';

import NotFound from './NotFound';
import RadioInput from './RadioInput';
import { NavPage } from './Layouts';
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
  if(!gateway) return <NotFound />

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
          </ul>
        </LeftColumn>
        <RightColumn>
          test
        </RightColumn>
      </ColumnContainer>
    </NavPage>
  )
}
