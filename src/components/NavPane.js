import React from 'react';

import { css } from 'glamor';
import { unimportant } from '../styles/typography';

import { Link } from 'react-router-dom';
import Collapsible from './Collapsible';

const styles = {
  navPane: css({
    '& .collapsibleContainer, & .collapsibleContainer a': {
      color: '#666',
      textDecoration: 'none',
      fontSize: 14,
      //fontWeight: 'bold'
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
  <LinkOrText to={`/networks/${network.id}`}
    matchUrl={match.url}>
    {network.radio}
  </LinkOrText>
);

export default ({ networks, router, match }) => {
  if(!networks.length) return <div>No networks found</div>

  return (
    <nav className={styles.navPane}>
      <div className='collapsibleContainer'>
        {networks.map(network => (
          <Collapsible
            key={network.id}
            trigger={<Trigger {...{network, match}} />}
            open={router.location.pathname.indexOf(`/networks/${network.id}`) === 0}>
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
