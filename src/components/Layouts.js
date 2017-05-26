import React from 'react';

import { css } from 'glamor';
import NavPane from './NavPane'

const fullPageContainer = css({
  width: '100%',
  maxWidth: 500,
  margin: '0 auto',
  padding: '0 10px'
});

export const FullPage = props => <div className={fullPageContainer}>
  {props.children}
</div>;

const navPageStyles = {
  container: css({
    display: 'table',
    width: '100%',
    padding: 10
  }),
  nav: css({
    display: 'table-cell',
    width: '25%',
    verticalAlign: 'top',
    paddingTop: 20
  }),
  content: css({
    display: 'table-cell',
    verticalAlign: 'top'
  })
}

export const NavPage = props => (
  <div className={navPageStyles.container}>
    <div className={navPageStyles.nav}>
      <NavPane {...props} />
    </div>
    <div className={navPageStyles.content}>
      {props.children}
    </div>
  </div>
);
