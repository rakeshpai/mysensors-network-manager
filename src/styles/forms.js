import { css } from 'glamor';
import { outline } from './colors';
import { transition } from './animations';

export const outlineStyle = { boxShadow: `0px 0px 10px ${outline}` }
export const outlineStyleThin = { boxShadow: `0px 0px 5px ${outline}` }

export const info = css({
  color: '#666',
  fontSize: 12,
  marginTop: 3,
  marginBottom: 5
});

export const button = css({
  cursor: 'pointer',
  background: 'none',

  border: '1px solid #ccc',
  borderRadius: 5,
  padding: '5px 10px',
  fontSize: 14,
  textShadow: '0px 1px 1px #fff',
  backgroundImage: 'linear-gradient(to bottom, #fff, #eee)',
  transition,

  '&:hover, &:focus': {
    color: '#666',
    borderColor: '#999',
    backgroundImage: 'linear-gradient(to bottom, #fff, #ddd)'
  },

  '&:focus': { ...outlineStyle }
});
