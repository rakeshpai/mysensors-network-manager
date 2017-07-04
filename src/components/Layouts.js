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

export const FullPage = props => (
  <main className={fullPageContainer}>
    {props.children}
  </main>
);

const breakpointWidth = 700;
const breakpoint = `@media(max-width: ${breakpointWidth}px)`;

const navPageStyles = {
  container: css({
    display: 'flex',
    width: '100%',
    minHeight: '90vh',

    [breakpoint]: {
      display: 'block'
    }
  }),
  nav: css({
    minWidth: 150,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    background: '#fafbfc',
    borderRight: '1px solid #e1e4e8'
  }),
  content: css({
    flexGrow: 6,
    flexShrink: 6,
    flexBasis: 0,
    overflow: 'hidden',
    padding: '10px 40px 40px',

    [breakpoint]: {
      padding: 10
    }
  })
};

export const NavPage = props => (
  <div className={navPageStyles.container}>
    <div className={navPageStyles.nav}>
      <MediaQuery query={`(max-width: ${breakpointWidth}px)`}>
        <Collapsible trigger='Navigation' withBg={true}>
          <NavPane {...props} />
        </Collapsible>
      </MediaQuery>
      <MediaQuery query={`(min-width: ${breakpointWidth + 1}px)`}>
        <NavPane {...props} />
      </MediaQuery>
    </div>
    <main className={navPageStyles.content}>
      {props.children}
    </main>
  </div>
);

const colBreakpoint = `@media(max-width: 800px)`;
const columnStyles = {
  container: css({
    display: 'flex',
    alignItems: 'flex-start',

    [colBreakpoint]: {
      display: 'block',
      padding: 0
    }
  }),
  leftColumn: css({
    flex: 1,
    verticalAlign: 'top',

    [colBreakpoint]: {
      display: 'block',
      width: '100%'
    }
  }),
  rightColumn: css({
    flex: 1,
    paddingLeft: 20,
    verticalAlign: 'top',

    [colBreakpoint]: {
      display: 'block',
      padding: 0
    }
  })
}

export const ColumnContainer = ({ children }) => (
  <div className={columnStyles.container}>{children}</div>
)

export const LeftColumn = ({ children }) => (
  <div className={columnStyles.leftColumn}>{children}</div>
)

export const RightColumn = ({ children }) => (
  <div className={columnStyles.rightColumn}>{children}</div>
)
