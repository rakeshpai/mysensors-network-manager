import React from 'react';
import { Link } from 'react-router-dom';
import { AddButton, DownloadButton, DeleteButton } from './Buttons';
import { confirm } from './Modal';

import { css } from 'glamor';

import generateSketch from '../sketch-generator';

const styles = {
  menu: css({
    float: 'right',
    paddingTop: 15
  }),
  switcher: css({
    display: 'inline-block',
    border: '1px solid #eee',
    margin: 0,
    padding: 0,
    borderRadius: 5,
    verticalAlign: 'top',

    '& li': {
      display: 'inline-block',

      '& span, & a': {
        display: 'inline-block',
        padding: '5px 10px',
      },

      '& span': {
        color: '#999'
      },

      '& a': {
        background: '#eee',
        cursor: 'pointer',
        textDecoration: 'none'
      }
    }
  })
}

export default ({ network, node, view, handlers }) => (
  <div className={styles.menu}>
    {!node && (
      <div>
        <AddButton onClick={e => handlers.addNode(network.id)} title='Add a new node' />
        <DeleteButton onClick={() => confirm({
            title: 'Delete this network?',
            text: 'Are you sure you want to delete this network and all its nodes and sensors? You can\'t undo this!',
            dangerButtonText: 'Yes, delete this network'
        }).then(() => handlers.deleteNetwork(network.id))}
          title='Delete this network' />
      </div>
    )}

    {node && (
      <div>
        <ul className={styles.switcher}>
          <li>
            {view === 'edit'?<span>Editor</span>:<Link to={`/networks/${network.id}/${node.type === 'gateway'?'gateway':node.id}`}>Editor</Link>}
          </li>
          <li>
            {view === 'edit'?<Link to={`/networks/${network.id}/${node.id}/code`}>Code</Link>:<span>Code</span>}
          </li>
        </ul>

        <DownloadButton title='Download the sketch for this node'
          onClick={() => generateSketch({ network, nodeId: node.id }, 'arduino' ) } />

        {node.type !== 'gateway' && (
          <DeleteButton title='Delete this node' onClick={() => confirm({
              title: 'Delete this node?',
              text: 'Are you sure you want to delete this node and all its sensors? You can\'t undo this!',
              dangerButtonText: 'Yes, delete this node'
            }).then(handlers.deleteNode)} />
        )}
      </div>
    )}
  </div>
);
