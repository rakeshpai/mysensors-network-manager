import { css } from 'glamor';
import { transition } from './animations';

export const switcherContainer = css({
  display: 'inline-block',
  margin: 0,
  padding: 0,

  '@media(max-width: 500px)': {
    textAlign: 'center'
  },
})

export const switcherItem = css({
  display: 'inline-block',
  listStyle: 'none',
  cursor: 'pointer',

  border: '1px solid #ddd',
  borderRight: 0,
  backgroundImage: 'linear-gradient(to bottom, #fff, #eee)',

  transition,

  '&:nth-child(1)': {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },

  '&:nth-last-child(1)': {
    borderRight: '1px solid #ddd',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5
  },

  '&:hover, &:focus': {
    backgroundImage: 'linear-gradient(to bottom, #fff, #ddd)'
  }
})

export const switcherItemSelected = css({
  color: '#999',
  boxShadow: 'inset 0 0.15em 0.3em rgba(27,31,35,0.15)',
  textShadow: '1px 1px 1px #fff',
  backgroundImage: 'none',
  cursor: 'default',

  '&:hover, &:focus': {
    backgroundImage: 'none'
  }
})
