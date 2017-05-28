import React from 'react';

import { pageHeading, pageSubheading } from '../styles/typography';

import { NavPage } from './Layouts';

export default props => {

  return (
    <NavPage {...props}>
      <h2 className={pageHeading}>
        Gateway
      </h2>
      <p className={pageSubheading}>
        Edit your gateway's settings.
      </p>

      Which type of gateway are you using?
      
    </NavPage>
  )
}
