import React from 'react';
import { css } from 'glamor';

import { backup } from '../lib/backupAndRestore';

import { PrimaryButton } from './Buttons';
import IDEFormatPicker from './IDEFormatPicker';
import { hide } from './Modal';

const styles = {
  container: css({
    width: 350,
    minWidth: '90%'
  })
};

export default ({ network, format : fmt = 'arduino' }) => {
  let format = fmt;

  const onFormatChange = fmt => format = fmt;
  const onButtonClick = e => {
    backup(network, format);
    hide();
  }

  return (
    <div className={styles.container}>
      <h1>Create a backup</h1>

      <div className={css({textAlign: 'center'})}>
        <IDEFormatPicker format={format} onChange={onFormatChange} />
      </div>

      <footer>
        <PrimaryButton onClick={onButtonClick}>Download</PrimaryButton>
      </footer>
    </div>
  )
};
