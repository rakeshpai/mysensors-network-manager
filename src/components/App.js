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
  })
};

export default ({ network }) => <div>
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
</div>;
