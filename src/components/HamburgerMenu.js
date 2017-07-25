import React from 'react';
import { Link } from 'react-router-dom';

import { Download, Trash, Plus, Network } from './Icons';
import { confirm, show } from './Modal';
import DownloadDialog from './DownloadDialog';
import BackupDialog from './BackupDialog';

import { success } from '../styles/colors';
import { button } from '../styles/forms';
import { transition } from '../styles/animations';
import { css } from 'glamor';

const styles = {
  group: css({
    marginBottom: 10,

    '&:nth-child(1)': { marginTop: 5 },

    '&:nth-last-child(1)': { marginBottom: 3 },

    '& ul': {
      margin: 0
    }
  }),
  menuItem: css(button, {
    textAlign: 'left',
    fontSize: 16,
    padding: '5px 10px 5px 5px',
    marginBottom: 3,
    width: '100%',

    display: 'flex',
    alignItems: 'center',

    whiteSpace: 'nowrap',
    overflow: 'hidden',

    border: '1px solid transparent',
    color: 'inherit',
    textDecoration: 'none',
    backgroundImage: 'none',

    '& svg': {
      display: 'inline-block',
      marginRight: 5,
      transition
    },

    '&:hover, &:focus': {
      background: '#fafafa',
      borderColor: '#ddd',
      textDecoration: 'none',
      color: success,

      '& svg': { stroke: success }
    }
  }),
  deleteMenuItem: css({
    '&:hover, &:focus': {
      color: 'red',
      '& svg': { stroke: 'red' }
    }
  }),
};

export default ({ network, node, handlers, closeDropdown }) => (
  <div>
    {node && (
      <fieldset className={styles.group}>
        <legend>Node options</legend>
        <ul>
          <li>
            <button
              className={styles.menuItem}
              onClick={e => {
                closeDropdown();
                show({ contentLabel: 'Download' }, <DownloadDialog {...{ network, node }} />);
              }}>
              <Download />
              Download this node's code…
            </button>
          </li>
          {node.type !== 'gateway' && (
            <li>
              <button
                className={css(styles.menuItem, styles.deleteMenuItem)}
                onClick={() => {
                  closeDropdown();
                  confirm({
                    title: 'Delete this node?',
                    text: 'Are you sure you want to delete this node and all its sensors? You can\'t undo this!',
                    dangerButtonText: 'Yes, delete this node'
                  }).then(handlers.deleteNode)
                }}>
                <Trash />
                Delete this node
              </button>
            </li>
          )}
        </ul>
      </fieldset>
    )}

    <fieldset className={styles.group}>
      <legend>Network options</legend>

      <ul className={css({marginBottom: 0})}>
        <li>
          <button
            className={styles.menuItem}
            onClick={e => {
              closeDropdown();
              handlers.addNode(network.id);
            }}>
            <Plus />
            Add a new node to this network
          </button>
        </li>
        <li><hr /></li>
        <li>
          <button
            className={styles.menuItem}
            onClick={e => {
              closeDropdown();
              show({ contentLabel: 'Backup' }, <BackupDialog network={network} />);
            }}>
            <Download />
            Download a backup…
          </button>
        </li>
        <li>
          <button
            className={css(styles.menuItem, styles.deleteMenuItem)}
            onClick={() => {
              closeDropdown();
              confirm({
                title: 'Delete this network?',
                text: 'Are you sure you want to delete this network and all its nodes and sensors? You can\'t undo this!',
                dangerButtonText: 'Yes, delete this network'
              }).then(() => handlers.deleteNetwork(network.id))
            }}>
            <Trash />
            Delete this network
          </button>
        </li>
        <li><hr /></li>
        <li>
          <Link className={styles.menuItem} to='/networks/create'>
            <Network />
            Create a new network
          </Link>
        </li>
      </ul>
    </fieldset>
  </div>
)
