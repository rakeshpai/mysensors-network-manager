import React from 'react';

import { pageHeading, pageSubheading } from '../styles/typography';
import { NavPage } from './Layouts';

import NotFound from './NotFound';

import { formatNumber } from '../lib/utils';

export default props => {
  const network = props.networks.find(n => n.id === props.match.params.networkId);

  if(!network) return <NotFound />

  return <NavPage {...props}>
    <h2 className={pageHeading}>
      {network.radio} based network
      <p className={pageSubheading}>
        Operating at {formatNumber(network.frequency)} MHz.
      </p>
    </h2>
  </NavPage>
};
