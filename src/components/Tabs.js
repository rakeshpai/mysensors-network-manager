import React from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { css } from 'glamor';

const styles = {
  tabList: css({
    margin: '0 0 10px',
    padding: 0,
    borderBottom: '1px solid #eee'
  }),

  tab: css({
    display: 'inline-block',
    border: '1px solid tranparent',
    borderBottom: 'none',
    bottom: -1,
    position: 'relative',
    listStyle: 'none',
    padding: '6px 12px',
    cursor: 'pointer',
    background: '#eee',
    marginLeft: 5,
    fontSize: 14,

    '&:focus': {
      boxShadow: '0 0 5px hsl(208, 99%, 50%)',
      borderColor: 'hsl(208, 99%, 50%)',
      outline: 'none',
    },
  }),

  selectedTab: css({
    background: '#fff',
    borderColor: '#aaa',
    color: 'black',
    border: '1px solid #eee',
    borderBottom: '1px solid #fff',
    borderTop: '3px solid #0095dd',
    borderRadius: '5px 5px 0 0',
    boxShadow: '0 -1px 5px #eee'
  })
};

export default ({ network }) => {
  const tabs = [1,2];

  return <Tabs>
    <TabList className={styles.tabList.toString()}>
      {tabs.map(tabIndex => <Tab
          key={tabIndex}
          className={styles.tab.toString()}
          selectedClassName={styles.selectedTab.toString()}>
          Tab {tabIndex}
        </Tab>
      )}
    </TabList>

    {tabs.map(tabIndex => <TabPanel key={tabIndex}>
      Contents of {tabIndex}
    </TabPanel>)}
  </Tabs>
}
