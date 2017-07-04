import React from 'react';

import '../index.css';
import { css } from 'glamor';
import { headingFontFamily } from '../styles/typography';
import { headerBackground, headerColor } from '../styles/colors';

import Notification from './Notification';
import CreateNetwork from '../containers/CreateNetwork';
import Network from '../containers/Network';
import Gateway from '../containers/Gateway';
import Node from '../containers/Node';
import Code from '../containers/Code';

import wrapInContainer from '../containers/wrapInContainer';
import Home from './Home';
import Networks from './Networks';
import { SiteIcon } from './Icons';

import { modalStub } from './Modal';

import { Route, Switch } from 'react-router-dom';

const styles = {
  container: css({
    minHeight: '100vh',
    height: '100%',
    position: 'relative'
  }),
  header: css({
    background: headerBackground,
    display: 'flex',
    alignItems: 'center',
    padding: '0 10px'
  }),

  h1: css({
    fontFamily: headingFontFamily,
    margin: 0,
    padding: '15px 10px',
    fontWeight: 300,
    fontSize: 20,
    color: headerColor,
    display: 'inline-block'
  }),

  footer: css({
    position: 'absolute',
    bottom: 0,
    width: '100%',
    background: '#fafbfc',
    borderTop: '1px solid #e1e4e8',
    color: '#666',
    padding: 10,
    fontSize: 12,
    display: 'flex',

    '& div': {
      flex: 1,

      '&:nth-child(2)': {
        textAlign: 'right'
      }
    },

    [`@media(max-width: 400px)`]: {
      position: 'relative',
      display: 'block',

      '& div:nth-child(1)': {
        paddingBottom: 5
      },

      '& div:nth-child(2)': {
        textAlign: 'left'
      }
    },

    '& a': {
      color: '#666'
    }
  })
};

export default ({ network }) => (
  <div className={styles.container}>
    <Notification />
    {modalStub}
    <header className={styles.header}>
      <SiteIcon />
      <h1 className={styles.h1}>
        MySensors Configurator
      </h1>
    </header>

    <Switch>
      <Route exact path='/' component={wrapInContainer(Home)} />
      <Route exact path='/networks' component={wrapInContainer(Networks)} />
      <Route exact path='/networks/create' component={CreateNetwork} />
      <Route exact path='/networks/:networkId' component={Network} />
      <Route exact path='/networks/:networkId/gateway' component={Gateway} />
      <Route exact path='/networks/:networkId/:nodeId' component={Node} />
      <Route exact path='/networks/:networkId/:nodeId/code' component={Code} />
    </Switch>

    <footer className={styles.footer}>
      <div>
        Built with <a href='https://www.mysensors.org/'>MySensors</a>.
      </div>
      <div>
        Like what you see? Please let us know!
        {' '}
        <a target='_blank' rel='noopener noreferrer' href='https://forum.mysensors.org/topic/6980/browser-based-firmware-generator/'>Forum thread</a>,
          {' '}
          <a target='_blank' rel='noopener noreferrer' href='https://github.com/rakeshpai/mysensors-network-manager'>GitHub</a>.
      </div>
    </footer>
  </div>
);
