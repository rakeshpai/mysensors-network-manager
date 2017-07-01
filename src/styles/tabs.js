import { css } from 'glamor';

export default css({
  '& .react-tabs__tab-list': {
    display: 'inline-block',
    margin: 0,
    padding: 0,

    '@media(max-width: 500px)': {
      textAlign: 'center'
    }
  },

  '& .react-tabs__tab': {
    display: 'inline-block',
    listStyle: 'none',
    cursor: 'pointer',

    padding: '5px 10px',
    border: '1px solid #ddd',
    borderRight: 0,

    transition: 'all 0.3s ease-in-out',

    '&:nth-child(1)': {
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5
    },

    '&:nth-last-child(1)': {
      borderRight: '1px solid #ddd',
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5
    }
  },

  '& .react-tabs__tab--selected': {
    color: '#999',
    boxShadow: 'inset 0 0.15em 0.3em rgba(27,31,35,0.15)',
  }
})
