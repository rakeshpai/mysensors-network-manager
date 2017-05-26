import React from 'react';

import { FullPage } from '../components/Layouts';
import { pageHeading } from '../styles/typography';
import { Link } from 'react-router-dom';

import { css } from 'glamor';

const ul = css({
  '& li': {
    padding: '3px 0'
  }
});

export default ({ match }) => <FullPage>
  <h2 className={pageHeading}>Done!</h2>

  <p>Your network has been created.</p>
  <p>Next steps:</p>
  <ul className={ul}>
    <li><Link to={`/networks/${match.params.networkId}/gateway`}>Specify the gateway</Link></li>
    <li><Link to={`/networks/${match.params.networkId}/add-node`}>Add a new node</Link></li>
    <li>...or <Link to={`/networks/${match.params.networkId}`}>modify</Link> the network's settings.</li>
  </ul>
</FullPage>;
