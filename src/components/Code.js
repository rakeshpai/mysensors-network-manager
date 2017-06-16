import React from 'react';

import { NavPage } from './Layouts';
import NotFound from './NotFound';
import PageMenu from './PageMenu';
import SyntaxHighlighter from './SyntaxHighlighter';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

import tabs from '../styles/tabs';
import { pageHeading } from '../styles/typography';

import securityPersonalizer from '../sketch-generator/security-personalizer';
import nodeSketchFiles from '../sketch-generator/node-sketch-files';

export default props => {
  const { networks, match } = props;

  const { networkId, nodeId } = match.params;
  const network = networks.find(n => n.id === networkId);
  if(!network) return <NotFound />;

  const node = network.nodes.find(n => n.id === nodeId);
  if(!node) return <NotFound />;

  const handlers = props.createHandlers(networkId, nodeId);

  const files = nodeSketchFiles({network, nodeId}, node.name);

  return (
    <NavPage {...props}>
      <PageMenu network={network} node={node} handlers={handlers} view='code' />

      <h2 className={pageHeading}>
        {node.name} Code
      </h2>

      <Tabs className={tabs.toString()} defaultIndex={2}>
        <TabList>
          <Tab>SecurityPersonalizer.ino</Tab>
          <Tab>config.h</Tab>
          <Tab>{node.name}.ino</Tab>
        </TabList>

        <TabPanel>
          <SyntaxHighlighter>
            {securityPersonalizer({network, nodeId}, JSON.parse(window.localStorage.getItem('sp-ino')).text).trim()}
          </SyntaxHighlighter>
        </TabPanel>
        <TabPanel>
          <SyntaxHighlighter>
            {files.find(f => f.name === 'config.h').contents.trim()}
          </SyntaxHighlighter>
        </TabPanel>
        <TabPanel>
          <SyntaxHighlighter>
            {files.find(f => f.name !== 'config.h').contents.trim()}
          </SyntaxHighlighter>
        </TabPanel>
      </Tabs>

    </NavPage>
  );
}
