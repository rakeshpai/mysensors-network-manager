import React from 'react';

import { css } from 'glamor';
import NavPane from './NavPane';
import MediaQuery from 'react-responsive';
import Collapsible from './Collapsible';

const fullPageContainer = css({
  width: '100%',
  maxWidth: 500,
  margin: '0 auto',
  padding: '0 10px'
});

export const FullPage = props => <main className={fullPageContainer}>
  {props.children}
</main>;

const breakpointWidth = 500;
const breakpoint = `@media(max-width: ${breakpointWidth}px)`;

const navPageStyles = {
  container: css({
    display: 'table',
    width: '100%',
    padding: 10,

    [breakpoint]: {
      display: 'block'
    }
  }),
  nav: css({
    display: 'table-cell',
    width: '25%',
    verticalAlign: 'top',
    paddingTop: 20,

    [breakpoint]: {
      display: 'block',
      width: '100%'
    }
  }),
  content: css({
    display: 'table-cell',
    verticalAlign: 'top',

    [breakpoint]: {
      display: 'block'
    }
  })
};

export const NavPage = props => (
  <div className={navPageStyles.container}>
    <div className={navPageStyles.nav}>
      <MediaQuery query={`(max-device-width: ${breakpointWidth}px)`}>
        <Collapsible trigger='Navigation' withBg={true}>
          <NavPane {...props} />
        </Collapsible>
      </MediaQuery>
      <MediaQuery query={`(min-device-width: ${breakpointWidth}px)`}>
        <NavPane {...props} />
      </MediaQuery>
    </div>
    <main className={navPageStyles.content}>
      {props.children}
    </main>
  </div>
);
