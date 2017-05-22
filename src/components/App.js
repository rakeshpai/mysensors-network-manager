import React from 'react';

import '../index.css';
import { css } from 'glamor';
import { headingFontFamily } from '../styles/typography';

import CreateNetwork from '../containers/CreateNetwork';
import Network from './Network';

import { Route } from 'react-router'

const styles = {
  header: css({
    background: '#eaeff2',
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

  <Route exact path='/' component={CreateNetwork} />
  <Route path='/network' component={Network} />
</div>;
