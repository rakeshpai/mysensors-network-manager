import React from 'react';
import { css } from 'glamor';
import { headingFontFamily } from '../styles/typography';
import Navigation from '../containers/Navigation';
import Tabs from '../containers/Tabs';

const styles = {
  h2: css({
    fontFamily: headingFontFamily,
    margin: 0,
    fontSize: 30,
    fontWeight: 'normal',
    padding: 10
  }),

  pageContainer: css({
    display: 'table',
    width: '100%',
    padding: 10
  }),

  column: css({
    margin: 0,
    display: 'table-cell',
    verticalAlign: 'top'
  })
};


export default props => <div>
  <h2 className={styles.h2}>

  </h2>

  <div className={styles.pageContainer}>
    <div className={css(styles.column, {width: '22%'})}>
      <Navigation />
    </div>
    <div className={css(styles.column)}>
      <Tabs />
    </div>
  </div>
</div>;
