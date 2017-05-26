import React from 'react';
import { css } from 'glamor';
import { headingFontFamily, pageSubheading } from '../styles/typography';

import { formatNumber } from '../lib/utils';

const styles = {
  h2: css({
    fontFamily: headingFontFamily,
    margin: 0,
    fontSize: 30,
    fontWeight: 'normal',
    padding: 10
  }),
};

export default props => {
  const network = props.networks.find(n => n.id === props.match.params.networkId);

  return <div>
    <h2 className={styles.h2}>
      {network.radio} based network
      <p className={pageSubheading}>
        Operating at {formatNumber(network.frequency)} MHz.
      </p>
    </h2>
  </div>
};
