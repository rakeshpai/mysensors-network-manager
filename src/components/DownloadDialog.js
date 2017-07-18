import React from 'react';
import { css } from 'glamor';

import generateSketch from '../sketch-generator';

import { Button } from './Buttons';
import { Arduino, PlatformIO } from './Icons';
import { hide } from './Modal';

const styles = {
  container: css({
    width: 300,
    minWidth: '90%'
  }),

  downloadButtons: css({
    display: 'flex',

    '& > div': {
      flex: 1,

      '&:nth-child(1)': {
        paddingRight: 2
      },

      '&:nth-last-child(1)': {
        paddingLeft: 2
      }
    },

    '& button': {
      padding: 20,

      '& p': {
        marginBottom: 0,

        '& > span': {
          fontWeight: 'bold'
        }
      }
    }
  })
};

const onButtonClick = ({ network, node, format }) => e => {
  generateSketch({ network, nodeId: node.id }, format);
  hide();
}

export default props => (
  <div className={styles.container}>
    <div className={styles.downloadButtons}>
      <div>
        <Button onClick={onButtonClick({...props, format: 'arduino'})}>
          <Arduino/>
          <p>Download for <span>Arduino IDE</span></p>
        </Button>
      </div>
      <div>
        <Button onClick={onButtonClick({...props, format: 'platformio'})}>
          <PlatformIO />
          <p>Download for <span>PlatformIO</span></p>
        </Button>
      </div>
    </div>
  </div>
);
