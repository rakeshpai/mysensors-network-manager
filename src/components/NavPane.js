import React from 'react';
import { css } from 'glamor';
import { unimportant } from '../styles/typography';

import { Link } from 'react-router-dom';
import Collapsible from 'react-collapsible';

const styles = {
  navPane: css({
    '& .collapsibleContainer, & .collapsibleContainer a': {
      color: '#111',
      textDecoration: 'none',
      fontSize: 12,
      fontWeight: 'bold'
    },

    //Collapsible chevron styles go here, sadly
    '& .chevron': {
      display: 'inline-block',
      transform: 'rotate(0deg)',
      transition: 'transform 0.3s linear',
      fontWeight: 'bold',
      fontSize: 16,
      marginRight: 5
    },

    '& .is-open .chevron': {
      transform: 'rotate(90deg)',
      transition: 'transform 0.3s linear'
    }
  }),

  triggerNode: css({
    padding: 3,
    cursor: 'pointer',

    '&:hover': {
      background: '#f4f7f8'
    }
  }),

  nodesList: css({
    margin: 0,
    padding: '15px 15px 15px 15px',
    listStyle: 'none'
  })
};

const LinkOrText = ({ to, matchUrl, children }) => {
  if(to === matchUrl) return <span>{children}</span>;

  return <Link to={to}>{children}</Link>
}

const Trigger = ({ network, match }) => (
  <div className={styles.triggerNode}>
    <span className='chevron'>›</span>
    {' '}
    <LinkOrText to={`/networks/${network.id}`}
      matchUrl={match.url}>
      {network.radio}
    </LinkOrText>
  </div>
);

export default ({ networks, router, match }) => {
  if(!networks.length) return <div>No networks found</div>

  return (
    <nav className={styles.navPane}>
      <div className='collapsibleContainer'>
        {networks.map(network => (
          <Collapsible
            key={network.id}
            open={router.location.pathname.indexOf(`/networks/${network.id}`) === 0}
            trigger={<Trigger {...{network, match}} />}
            transitionTime={300}>
            <ul className={styles.nodesList}>
              <li>
                <LinkOrText to={`/networks/${network.id}/gateway`}
                  matchUrl={match.url}>Gateway</LinkOrText>
              </li>
            </ul>
          </Collapsible>
        ))}
      </div>

      <Link to='/networks/create' className={unimportant}>Create a new network</Link>
    </nav>
  )
}
