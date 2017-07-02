import React from 'react';

import { css } from 'glamor';
import { FullPage } from './Layouts';
import { heading, pageSubheading, unimportant } from '../styles/typography';
import { outlineStyle } from '../styles/forms';
import { Link } from 'react-router-dom';

import { radios } from '../lib/constants';

const styles = {
  networkList: css({
    padding: 0,
    listStyle: 'none',

    '& li': {
      marginBottom: 10
    }
  }),
  networkItem: css({
    border: '1px solid #eee',
    padding: 15,
    borderRadius: 5,
    display: 'block',
    textDecoration: 'none',
    color: '#888',
    transition: 'all 0.3s ease-in',

    '&:hover, &:focus': {
      background: '#f9f9f9',
      borderColor: '#ddd',

      '& h3': {
        textDecoration: 'none',
        color: '#666'
      }
    },

    '&:focus': {
      ...outlineStyle
    }
  }),
  heading: css({
    fontWeight: 'normal',
    margin: 0,
    paddingBottom: 5,
    color: '#888',
  }),
  description: css({
    fontColor: '#ccc',
    fontSize: 14
  })
}

export default props => {
  return (
    <FullPage>
      <h2 className={heading}>Networks</h2>

      {props.networks.length === 0 && (
        <div className={pageSubheading}>
          You haven't created any networks yet. Go ahead and <Link to='/networks/create'>create a network</Link>.
        </div>
      )}

      {props.networks.length > 0 && (
        <div>
          Your networks:
          <ul className={styles.networkList}>
            {props.networks.map(network => {
              const frequencyString = radios
                .find(r => r.name === network.radio)
                .frequencies
                .find(f => (network.radio === 'NRF24L01+' ? network.nrfChannel : network.rfmFrequency ) === f.value)
                .display;

              return (
                <li key={network.id}>
                  <Link to={`/networks/${network.id}`} className={styles.networkItem}>
                    <h3 className={styles.heading}>{network.radio} based network</h3>
                    <div className={styles.description}>
                      {frequencyString}
                      {', '}
                      {network.nodes.length} node{network.nodes.length !== 1 && 's'}.
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
          <Link to='/networks/create' className={unimportant}>Create a new network</Link>
        </div>
      )}
    </FullPage>
  )
};
