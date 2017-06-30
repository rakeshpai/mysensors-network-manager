import React from 'react';
import { Link } from 'react-router-dom';
import { confirm } from './Modal';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';

import { css } from 'glamor';
import { buttonLink } from '../styles/forms';

import editIcon from 'feather-icons/icons/core/edit.svg';
import textFile from 'feather-icons/icons/core/file-text.svg';

const styles = {
  menu: css({
    float: 'right',
    paddingTop: 15,

    '& .dropdown': {
      display: 'inline-block',
      position: 'relative'
    },
    '& .dropdown__content': {
      display: 'none',
      position: 'absolute',
      right: '0',
      top: 33,
      minWidth: 250,
      background: 'white',
      border: '1px solid #eee',
      padding: 5,
      boxShadow: '0 5px 8px rgba(0, 0, 0, 0.15)',

      '& ul': {
        padding: 0,

        '& li': {
          listStyle: 'none',
          margin: 0
        }
      }
    },
    '& .dropdown--active .dropdown__content': {
      display: 'block'
    }
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
  }),
  dropdownButton: css(buttonLink, {
    textAlign: 'left',
    fontSize: 16,
    padding: 3,
    width: '100%',

    '&:hover': {
      background: '#f1f1f1'
    }
  }),
  dropdownTrigger: css({
    padding: '5px 10px',
    display: 'inline-block',
    border: '1px solid #eee',
    borderRadius: 5,
    marginLeft: 10,

    ':after': {
      content: '"▾"',
      margin: '0 0 0 10px'
    }
  })
}

export default ({ network, node, view, handlers }) => {
  let dropdown;

  const closeDropdown = () => dropdown.hide();

  const EditIcon = () => <img src={editIcon} width='20' alt='Edit' />;
  const CodeIcon = () => <img src={textFile} width='20' alt='View code' />;

  return (
    <div className={styles.menu}>
      {node && (
        <ul className={styles.switcher}>
          <li>
            {view === 'edit'?<span><EditIcon /></span>:<Link to={`/networks/${network.id}/${node.type === 'gateway'?'gateway':node.id}`}><EditIcon /></Link>}
          </li>
          <li>
            {view === 'edit'?<Link to={`/networks/${network.id}/${node.id}/code`}><CodeIcon /></Link>:<span><CodeIcon /></span>}
          </li>
        </ul>
      )}

      <Dropdown ref={r => dropdown = r}>
        <DropdownTrigger>
          <span className={styles.dropdownTrigger}>
            More...
          </span>
        </DropdownTrigger>
        <DropdownContent>
          {node && (
            <div>
              <strong>Node options</strong>
              <ul>
                <li>
                  <button
                    className={styles.dropdownButton}
                    onClick={e => {
                      closeDropdown();
                      import('../sketch-generator')
                        .then(gen => gen.default({ network, nodeId: node.id }, 'arduino'))
                    }}>
                    Download this node's sketch
                  </button>
                </li>
                <li>
                  <button
                    className={css(styles.dropdownButton, { '&:hover': { color: 'red' }})}
                    onClick={() => {
                      closeDropdown();
                      confirm({
                        title: 'Delete this node?',
                        text: 'Are you sure you want to delete this node and all its sensors? You can\'t undo this!',
                        dangerButtonText: 'Yes, delete this node'
                      }).then(handlers.deleteNode)
                    }}>
                    Delete this node
                  </button>
                </li>
              </ul>
            </div>
          )}

          <strong>Network options</strong>
          <ul>
            <li>
              <button
                className={styles.dropdownButton}
                onClick={e => {
                  closeDropdown();
                  handlers.addNode(network.id);
                }}>
                Add a new node to this network
              </button>
            </li>
            <li>
              <button
                className={css(styles.dropdownButton, { '&:hover': { color: 'red' }})}
                onClick={() => {
                  closeDropdown();
                  confirm({
                    title: 'Delete this network?',
                    text: 'Are you sure you want to delete this network and all its nodes and sensors? You can\'t undo this!',
                    dangerButtonText: 'Yes, delete this network'
                  }).then(() => handlers.deleteNetwork(network.id))
                }}>
                Delete this network
              </button>
            </li>
          </ul>
        </DropdownContent>
      </Dropdown>
    </div>
  )
};
