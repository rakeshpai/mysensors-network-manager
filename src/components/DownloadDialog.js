import React from 'react';
import { css } from 'glamor';

import generateSketch from '../sketch-generator';

import { PrimaryButton } from './Buttons';
import IDEFormatPicker from './IDEFormatPicker';
import { hide } from './Modal';

const styles = {
  container: css({
    width: 350,
    minWidth: '90%'
  })
};

export default ({ network, node, format : fmt = 'arduino' }) => {
  let format = fmt;

  const onFormatChange = fmt => { format = fmt; }
  const onButtonClick = e => {
    generateSketch({ network, nodeId: node.id }, format);
    hide();
  }

  return (
    <div className={styles.container}>
      <h1>Download sketch</h1>

      <div className={css({textAlign: 'center'})}>
        <p>
          Preferred IDE:
        </p>
        <IDEFormatPicker format='arduino' onChange={onFormatChange} />
      </div>

      <footer>
        <PrimaryButton onClick={onButtonClick}>Download</PrimaryButton>
      </footer>
    </div>
  )
}
