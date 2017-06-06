import { css } from 'glamor';
import { outline, buttonColor } from './colors';

export const outlineStyle = { boxShadow: `0px 0px 10px ${outline}` }

export const info = css({
  color: '#666',
  fontSize: 12,
  marginTop: 3,
  marginBottom: 5
});

export const button = css({
  border: 0,
  fontSize: 16,
  padding: '5px 10px',
  appearance: 'none',
  borderRadius: 5,
  cursor: 'pointer',

  '&:focus': { ...outlineStyle }
});

export const successButton = css({
  background: buttonColor,
  color: '#fff',
  fontSize: 20,
  padding: '10px 25px',
});

export const footer = css({
  padding: '20px 0 30px',
  margin: '20px 0 30px',
  borderTop: '1px solid #ddd'
});
