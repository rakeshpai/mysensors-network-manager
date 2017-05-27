import React from 'react';

import '../index.css';
import { css } from 'glamor';
import { headingFontFamily } from '../styles/typography';
import { brandBackground } from '../styles/colors';

import CreateNetwork from '../containers/CreateNetwork';
import AfterCreate from '../containers/AfterCreate';
import Networks from '../containers/Networks';
import Network from '../containers/Network';

import { Route, Switch } from 'react-router-dom';

const styles = {
  header: css({
    background: brandBackground,
    boxShadow: '0 0 10px rgba(0,0,0,0.6)'
  }),

  h1: css({
    fontFamily: headingFontFamily,
    margin: 0,
    padding: '15px 10px',
    fontWeight: 'normal',
    fontSize: 20,
    color: '#666'
  })
};

export default ({ network }) => <div>
  <header className={styles.header}>
    <h1 className={styles.h1}>MySensors Network</h1>
  </header>

  <Switch>
    <Route exact path='/' component={CreateNetwork} />
    <Route exact path='/networks' component={Networks} />
    <Route exact path='/networks/create' component={CreateNetwork} />
    <Route exact path='/networks/:networkId/after-create' component={AfterCreate} />
    <Route exact path='/networks/:networkId' component={Network} />
    <Route path='/networks/:networkId/gateway' component={Network} />
  </Switch>
</div>;
