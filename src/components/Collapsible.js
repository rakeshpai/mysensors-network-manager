import React from 'react';

import Collapsible from 'react-collapsible';

import { css } from 'glamor';
import { brandBackground } from '../styles/colors';

const styles = {
  trigger: css({
    display: 'block',
    color: '#666',
    cursor: 'pointer'
  }),

  triggerWithBg: css({
    padding: '7px 5px 7px 10px',
    background: brandBackground
  }),

  chevron: chevron => css({
    [`:${chevron}`]: {
      content: '"›"',
      fontSize: '1.2em',
      display: 'inline-block',
      transform: 'rotate(0deg)',
      transition: 'transform 0.3s ease-in-out',
      fontWeight: 'bold',
      marginRight: 7,

      '.is-open&': {
        transform: 'rotate(90deg)',
        transition: 'transform 0.3s ease-in-out'
      }
    }
  }),

  contentWithBorder: css({
    border: `3px solid ${brandBackground}`,
    padding: '10px 10px',
    borderTop: 0
  })
}

export default ({
  children, trigger, chevron = 'before', withBg,
  triggerClassName, triggerOpenedClassName, contentInnerClassName,
  ...props
}) => {
  const triggerCss = [
    styles.trigger,
    styles.chevron(chevron),
    withBg && styles.triggerWithBg,
    triggerClassName
  ];

  return (
    <Collapsible
      trigger={trigger}
      transitionTime={300}
      easing='ease-in-out'
      triggerClassName={css(...triggerCss).toString()}
      triggerOpenedClassName={css(...triggerCss, triggerOpenedClassName).toString()}
      contentInnerClassName={css(
        withBg ? styles.contentWithBorder : {padding: '0 13px'},
        contentInnerClassName
      ).toString()}
      {...props}>
      {children}
    </Collapsible>
  )
};
