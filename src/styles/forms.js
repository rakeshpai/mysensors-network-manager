import { css } from 'glamor';
import { outline, buttonColor, linkColor } from './colors';

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
  background: buttonColor,
  color: 'white',

  '&:focus': { ...outlineStyle }
});

export const successButton = css(button, {
  background: buttonColor,
  color: '#fff',
  fontSize: 20,
  padding: '10px 25px',
});

export const dangerButton = css(button, { background: '#d9534f', color: '#fff' });

export const buttonLink = css({
  background: 'none',
  border: 'none',
  color: linkColor,
  cursor: 'pointer',

  ':hover': {
    textDecoration: 'underline'
  }
});

export const footer = css({
  padding: '20px 0 30px',
  margin: '20px 0 30px',
  borderTop: '1px solid #ddd'
});
