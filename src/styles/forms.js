import { css } from 'glamor';
import { outline, buttonColor } from './colors';

export const outlineStyle = { boxShadow: `0px 0px 10px ${outline}` }

export const row = css({
  display: 'table',
  width: '100%',
  padding: '5px 0'
});

export const leftCell = css({
  display: 'table-cell',
  width: '80%',
  verticalAlign: 'middle'
});

export const rightCell = css({
  display: 'table-cell',
  width: '20%',
  textAlign: 'right',
  paddingLeft: 30,

  '& input': {
    width: '100%'
  }
});

export const blockInput = css({
  display: 'inline-block',
  fontSize: 18,
  padding: 5,
  border: '1px solid #ddd',
  transition: 'all 0.3s ease-in',
  background: '#fff',
  borderRadius: 5,

  '&:focus': { ...outlineStyle }
});

export const fullWidthLabel = css({
  padding: '10px 0',
  display: 'block',

  '& input, & select': {
    display: 'block',
    width: '100%',
    marginTop: 10
  }
});

export const invalid = css({
  ':invalid': {
    border: '1px solid red'
  },

  ':invalid:focus': {
    boxShadow: '0px 0px 10px red'
  }
})

export const info = css({
  color: '#666',
  fontSize: 12
});

export const button = css({
  border: 0,
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
