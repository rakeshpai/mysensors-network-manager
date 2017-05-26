import React from 'react';
import { css } from 'glamor';
import { unimportant } from '../styles/typography';

import { Link } from 'react-router-dom';
import Collapsible from 'react-collapsible';

const styles = {
  navPageContainer: css({
    display: 'table',
    width: '100%',
    padding: 10
  }),

  navPane: css({
    display: 'table-cell',
    width: '25%',
    verticalAlign: 'top',

    '& .collapsibleContainer a': {
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

  pageContent: css({
    display: 'table-cell',
    verticalAlign: 'top'
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

const Trigger = ({ network }) => <div className={styles.triggerNode}>
  <span className='chevron'>›</span>
  {' '}
  <Link to={`/networks/${network.id}`}>
    {network.radio}
  </Link>
</div>

export default ({ networks, children, router }) => {
  if(!networks.length) return <div>No networks found</div>

  return <div className={styles.navPageContainer}>
    <nav className={styles.navPane}>
      <div className='collapsibleContainer'>
        {networks.map(network => (
          <Collapsible
            key={network.id}
            open={router.location.pathname.indexOf(`/networks/${network.id}`) === 0}
            trigger={<Trigger network={network} />}
            transitionTime={300}>
            <ul className={styles.nodesList}>
              <li>
                <Link to={`/networks/${network.id}/gateway`}>Gateway</Link>
              </li>
            </ul>
          </Collapsible>
        ))}
      </div>

      <Link to='/networks/create' className={unimportant}>Create a new network</Link>
    </nav>
    <div className={styles.pageContent}>
      {children}
    </div>
  </div>
}
