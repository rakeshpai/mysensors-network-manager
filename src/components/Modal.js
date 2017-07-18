import React, { Component } from 'react';
import Modal from 'react-modal';

import { DangerButton, LinkButton } from './Buttons';
import { css } from 'glamor';

css.global('.ReactModal__Body--open', { overflow: 'hidden' });

const center = 'translate(-50%, -50%)';

const styles = {
  contentBase: css({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: center,
    background: '#fff',
    boxShadow: '0 0 15px rgba(0,0,0,0.3)',
    border: '1px solid #aaa',
    borderRadius: 5,
    outline: 0,
    animation: `${css.keyframes({
      '0%': { transform: `${center} scale(0.1)`, opacity: 0 },
      '60%': { transform: `${center} scale(1.1)`, opacity: 1 },
      '100%': { transform: `${center} scale(1)` }
    })} .3s`
  }),

  overlay: css({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.3)'
  }),

  confirmFooter: css({
    textAlign: 'right',
    padding: '15px 0 5px 0',
  })
};

class ModalContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      suppliedProps: {},
      isOpen: false
    }
  }

  show(suppliedProps, contents) {
    this.setState({
      suppliedProps,
      contents,
      isOpen: true
    })
  }

  hide() {
    this.setState({ isOpen: false });
  }

  render() {
    return (
      <Modal
        shouldCloseOnOverlayClick={true}
        onRequestClose={this.hide.bind(this)}
        {...this.state.suppliedProps}
        contentLabel={this.state.suppliedProps.contentLabel || 'Modal'}
        isOpen={this.state.isOpen}
        className={{
          base: css(styles.contentBase, { maxWidth: this.state.suppliedProps.maxWidth }),
        }}
        overlayClassName={{
          base: styles.overlay
        }}>

        <div className={css({padding: 10})}>
          {this.state.contents}
        </div>
      </Modal>
    )
  }
}

let modalReference;

export const modalStub = <ModalContainer ref={r => modalReference = r} />
export const show = (...args) => modalReference.show(...args);
export const hide = () => modalReference.hide();

export const confirm = ({
  title = 'Are you sure?',
  text = 'Are you sure?',
  dangerButtonText = 'Yes',
  cancelButtonText = 'Cancel'
} = {}) => new Promise((resolve, reject) => {
  show({
    contentLabel: title,
    maxWidth: 400
  }, (
    <div>
      <p>
        {text}
      </p>
      <footer className={styles.confirmFooter}>
        <LinkButton onClick={hide}>{cancelButtonText}</LinkButton>
        {' '}
        <DangerButton onClick={() => { hide(); resolve(); }}>
          {dangerButtonText}
        </DangerButton>
      </footer>
    </div>
  ));
});

export const showLazy = ({ componentPromise, modalProps, componentProps }) => {
  show(modalProps, (
    <div>
      Loading...
    </div>
  ));

  componentPromise.then(({ default: Component}) => {
    show(modalProps, <Component {...componentProps} />);
  });
}
