import React from 'react';

import { css } from 'glamor';

import { radios } from '../lib/constants';

import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import { Network, Board, Plus } from './Icons';

const breakpoint = '@media(max-width: 500px)';

const styles = {
  networkChooser: css({
    padding: '30px 10px 10px',
    fontSize: 14,
    color: '#999',
    transition: 'all 0.3s ease-in-out',

    '& select': {
      display: 'block',
      width: '100%',
      fontSize: 12,
      color: '#999'
    },

    '&:hover': {
      color: '#111',

      '& select': {
        color: '#111'
      }
    }
  }),

  networkContents: css({
    listStyle: 'none',
    margin: 0,
    padding: 0,
    paddingLeft: 10,

    '& .heading': {
      textTransform: 'uppercase',
      fontSize: 10,
      padding: '15px 0 5px',
      color: '#999'
    },

    '& .section': {
      [breakpoint]: {
        marginRight: 10
      }
    },

    '& .section a': {
      textDecoration: 'none',
      color: '#aaa',
      padding: '10px 7px',
      border: '1px solid transparent',
      borderRight: 0,
      display: 'block',
      transition: 'all 0.3s ease-in-out',
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,

      '&:not(.selected):hover': {
        color: '#666'
      },

      [breakpoint]: {
        border: '1px solid transparent',
        borderRadius: 5,
      }
    },

    '& .section a.selected': {
      borderColor: '#ddd',
      background: '#fff',
      borderRight: '1px solid white',
      marginRight: -1,
      color: '#111',
      boxShadow: '-5px 2px 5px #eee',

      [breakpoint]: {
        border: '1px solid #ddd',
        boxShadow: '0 0 5px #eee'
      }
    },

    '& .fakeTab': {
      display: 'flex'
    },

    '& .icon': {
      width: 24,
      paddingTop: 2
    },

    '& strong': {
      fontWeight: 'normal'
    },

    '& .info': {
      margin: 0,
      fontSize: 12,
      paddingTop: 3,
      color: '#999'
    },

    '& .addNode': {
      border: 0,
      background: 'none',
      fontSize: 11,
      display: 'inline-block',
      marginTop: 15,
      cursor: 'pointer',
      color: '#aaa',

      '&:hover': {
        color: '#333'
      }
    }
  })
};

export default ({ networks, router, match, dispatch, ...props }) => {
  if(!networks.length) return <div>No networks found</div>

  const currentNetwork = networks.find(n => router.location.pathname.indexOf(`/networks/${n.id}`) === 0);


  const addNode = props.addNode ? props.addNode : props.createHandlers(currentNetwork.id).addNode;

  const onNetworkChange = networkId => {
    if(networkId === 'create') return dispatch(push('/networks/create'));
    return dispatch(push(`/networks/${networkId}`))
  }

  return (
    <nav>
      <div className={styles.networkChooser}>
        Select a network:
        <select onChange={e => onNetworkChange(e.target.value)}
          value={currentNetwork.id}>
          {
            networks.map(network => (
              <option key={network.id} value={network.id}>
                {network.radio}
              </option>
            ))
          }
          <option disabled>─</option>
          <option value='create'>Create a new network...</option>
        </select>
      </div>

      <div className={styles.networkContents}>
        <div className='section'>
          <div className='heading'>Network</div>

          <Link to={`/networks/${currentNetwork.id}`} className={router.location.pathname === `/networks/${currentNetwork.id}` ? 'selected' : ''}>
            <div className='fakeTab'>
              <div className='icon'>
                <Network size={16} />
              </div>
              <div className='label'>
                <strong>{currentNetwork.radio}</strong>
                <p className='info'>
                  {
                    radios
                      .find(r => r.name === currentNetwork.radio)
                      .frequencies
                      .find(f => (currentNetwork.radio === 'NRF24L01+' ? currentNetwork.nrfChannel : currentNetwork.rfmFrequency) === f.value)
                      .display
                  }
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className='section'>
          <div className='heading'>Nodes</div>

          <Link to={`/networks/${currentNetwork.id}/gateway`} className={router.location.pathname === `/networks/${currentNetwork.id}/gateway` ? 'selected': ''}>
            <div className='fakeTab'>
              <div className='icon'>
                <Board size={16} />
              </div>
              <div className='label'>
                <strong>Gateway</strong>
                <p className='info'>
                  {({serial: 'Serial', esp8266: 'ESP8266', ethernet: 'Ethernet'})[currentNetwork.nodes.find(n => n.type === 'gateway').gatewayType]} gateway
                </p>
              </div>
            </div>
          </Link>

          {
            currentNetwork
              .nodes
              .filter(n => n.type !== 'gateway')
              .sort((a, b) => b.name - a.name)
              .map(node => (
                <Link key={node.id} to={`/networks/${currentNetwork.id}/${node.id}`} className={router.location.pathname === `/networks/${currentNetwork.id}/${node.id}` ? 'selected': ''}>
                  <div className='fakeTab'>
                    <div className='icon'>
                      <Board size={16} />
                    </div>
                    <div className='label'>
                      <strong>{node.name}</strong>
                      <p className='info'>
                        {node.sensors.length} sensor{node.sensors.length === 1 ? '' : 's'}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
          }

          <button className='addNode' onClick={e => addNode(currentNetwork.id)}>
            <Plus size={10} /> Add a new node
          </button>
        </div>
      </div>
    </nav>
  )
}
