import React from 'react';
import { boards } from '../lib/constants';

export default ({ filter=()=>{}, recommended, value, ...props }) => {
  const filteredBoards = boards.filter(filter);

  return (
    <select {...props} value={value || ''}>
      {!filteredBoards.some(b => b.id === value) && <option>Pick one...</option>}
      {filteredBoards.map(board => (
        <option key={board.id} value={board.id}>
          {board.name}
          {board.id === recommended && ' (recommended)'}
        </option>
      ))}
    </select>
  )
};
