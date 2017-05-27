import React from 'react';

import { css } from 'glamor';
import { brandBackground } from '../styles/colors';
import NavPane from './NavPane';
import MediaQuery from 'react-responsive';
import Collapsible from 'react-collapsible';

const fullPageContainer = css({
  width: '100%',
  maxWidth: 500,
  margin: '0 auto',
  padding: '0 10px'
});

export const FullPage = props => <div className={fullPageContainer}>
  {props.children}
</div>;

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
  }),
  trigger: css({
    background: brandBackground,
    display: 'block',
    padding: '10px 5px 10px 10px'
  }),
  triggerOpened: css({
    paddingBottom: 7
  }),
  collapsibleContent: css({
    border: `3px solid ${brandBackground}`,
    padding: 10
  })
}

export const NavPage = props => (
  <div className={navPageStyles.container}>
    <div className={navPageStyles.nav}>
      <MediaQuery query={`(max-device-width: ${breakpointWidth}px)`}>
        <Collapsible trigger='Navigation'
          triggerClassName={navPageStyles.trigger.toString()}
          triggerOpenedClassName={css(navPageStyles.trigger, navPageStyles.triggerOpened).toString()}
          contentInnerClassName={css(navPageStyles.collapsibleContent).toString()}
          easing='ease-in-out'>
          <NavPane {...props} />
        </Collapsible>
      </MediaQuery>
      <MediaQuery query={`(min-device-width: ${breakpointWidth}px)`}>
        <NavPane {...props} />
      </MediaQuery>
    </div>
    <div className={navPageStyles.content}>
      {props.children}
    </div>
  </div>
);
