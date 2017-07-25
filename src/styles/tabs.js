import { css } from 'glamor';
import { switcherContainer, switcherItem, switcherItemSelected } from './switcher.js';

export default css({
  '& .react-tabs__tab-list': switcherContainer,

  '& .react-tabs__tab': css(switcherItem, {
    padding: '5px 10px',
  }),

  '& .react-tabs__tab--selected': switcherItemSelected
})
