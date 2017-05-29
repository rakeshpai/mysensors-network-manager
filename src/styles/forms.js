import { css } from 'glamor';
import { outline, buttonColor } from './colors';

export const outlineStyle = { boxShadow: `0px 0px 10px ${outline}` }

export const info = css({
  color: '#666',
  fontSize: 12,
  marginTop: 3
});

export const button = css({
  border: 0,
  appearance: 'none',
  padding: '10px 25px',
  fontSize: 20,
  borderRadius: 5,
  cursor: 'pointer',

  '&:focus': { ...outlineStyle }
});

export const successButton = css({
  background: buttonColor,
  color: '#fff'
});

export const footer = css({
  padding: '20px 0 30px',
  margin: '20px 0 30px',
  borderTop: '1px solid #ddd'
});
