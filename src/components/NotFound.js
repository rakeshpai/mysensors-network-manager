import React from 'react';

import { FullPage } from './Layouts';
import { pageHeading, pageSubheading } from '../styles/typography';
import { Link } from 'react-router-dom';

export default props => <FullPage>
  <h2 className={pageHeading}>404 - Not found</h2>
  <p className={pageSubheading}>That's it. Nothing more to say.</p>
  <p>
    <Link to='/'>Go to the home page.</Link>
  </p>
</FullPage>;
