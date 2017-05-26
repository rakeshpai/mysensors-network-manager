import React from 'react';

import { FullPage } from './Layouts';
import { pageHeading, pageSubheading } from '../styles/typography';

export default props => <FullPage>
  <h2 className={pageHeading}>404 - Not found</h2>
  <p className={pageSubheading}>That's it. Nothing more to say.</p>
</FullPage>;
