import React from 'react';
import { success } from '../styles/colors';
import { fontFamily } from '../styles/typography';
import NotificationSystem from 'react-notification-system';

const style = {
  NotificationItem: {
    success: {
      fontFamily,
      fontSize: 14,
      background: '#060',
      color: 'white',
      border: 0,
      borderRadius: 5,
      boxShadow: '0 0 10px rgba(0,0,0,0.9)'
    }
  },

  Title: {
    success: {
      color: 'white',
      fontFamily,
      fontSize: 18,
      fontWeight: 300
    }
  },

  Dismiss: {
    DefaultStyle: {
      display: 'none'
    }
  }
}

let container;

export default props => (
  <div>
    <NotificationSystem ref={r => container = r} style={style} />
  </div>
);

export const notify = params => container.addNotification(params);
