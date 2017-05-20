import { css } from 'glamor';

export const row = css({ display: 'table', width: '100%' });

export const leftCell = css({
  display: 'table-cell',
  width: '80%',
  verticalAlign: 'middle'
});

export const rightCell = css({
  display: 'table-cell',
  width: '20%',
  textAlign: 'right',

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

  '&:focus': {
    boxShadow: '0px 0px 10px rgba(52,117,237,1)'
  }
});

export const info = css({
  color: '#999',
  fontSize: 12
});

export const button = css({
  border: 0,
  padding: '7px 20px',
  fontSize: 18,
  borderRadius: 5
});

export const success = css({
  background: 'rgba(52,117,237,1)',
  color: '#fff'
});

export const footer = css({
  padding: '20px 0',
  margin: '20px 0',
  borderTop: '1px solid #ddd'
})
