import React from 'react';
import NotificationSystem from 'react-notification-system';

let container;

export default props => (
  <div>
    <NotificationSystem ref={r => container = r} />
  </div>
);

export const notify = params => container.addNotification(params);
