import React from 'react';
import { Redirect } from 'react-router-dom';

export default ({ networks }) => {
  if(!networks.length) return <Redirect to='/networks/create' />
  if(networks.length === 1) return <Redirect to={`/networks/${networks[0].id}`} />
  return <Redirect to='/networks' />
}
