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

const breakpointWidth = 700;
const breakpoint = `@media(max-width: ${breakpointWidth}px)`;

const navPageStyles = {
  container: css({
    display: 'flex',
    width: '100%',
    padding: 10,

    [breakpoint]: {
      display: 'block'
    }
  }),
  nav: css({
    minWidth: 150,
    paddingTop: 20,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  }),
  content: css({
    flexGrow: 6,
    flexShrink: 6,
    flexBasis: 0,
    overflow: 'hidden'
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
    display: 'table',
    width: '100%',
    paddingRight: 20,

    [colBreakpoint]: {
      display: 'block',
      padding: 0
    }
  }),
  leftColumn: css({
    display: 'table-cell',
    width: '55%',
    verticalAlign: 'top',

    [colBreakpoint]: {
      display: 'block',
      width: '100%'
    }
  }),
  rightColumn: css({
    display: 'table-cell',
    paddingLeft: 20,
    verticalAlign: 'top',

    [colBreakpoint]: {
      display: 'block',
      padding: '20px 0'
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
