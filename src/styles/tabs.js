import { css } from 'glamor';
import { buttonColor } from './colors';

export default css({
  '& .react-tabs__tab-list': {
    margin: '0 0 20px',
    padding: 0,
    paddingBottom: 5,

    '@media(max-width: 500px)': {
      textAlign: 'center'
    }
  },

  '& .react-tabs__tab': {
    display: 'inline-block',
    listStyle: 'none',
    cursor: 'pointer',

    borderBottom: '3px solid transparent',
    padding: '6px 12px',
    transition: 'all 0.3s ease-in-out',
  },

  '& .react-tabs__tab--selected': {
    borderBottom: `3px solid ${buttonColor}`,
  }
})
